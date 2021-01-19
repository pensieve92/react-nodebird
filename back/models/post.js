const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model{
    static init(sequelize){
        // super 상속받은것(Model) 호출
        return super.init({
            content: {
                type: DataTypes.TEXT,
                allowNull: false, // 필수
            }, 
        }, {
            modelName: 'Post',
            tablename : 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',  // 이모티콘 저장
            sequelize,  // sequelize를 index.js클래스로 보내줄것 이기 때문에
        })
    }

    static associate(db){
        db.Post.belongsTo(db.User);                   // post.addUser, post.getUser, post.setUser (belongsTo는 단수) -시퀄라이즈에서 만들어줌
        db.Post.belongsTo(db.Post, { as: 'Retweet'}); // 리트윗 // post.addRetweet (belongsTo는 단수)
        db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'}); // post.addPostHashtags
        db.Post.belongsToMany(db.User, {through: 'Like', as : 'Likers'});// post.addLikers, post.removeLikers 가 생김        
        db.Post.hasMany(db.Comment); // post.addComments, post.getComments (hasMany는 복수)
        db.Post.hasMany(db.Image);   // post.addImages,   post.getImages   (hasMany는 복수)
    }
}

// module.exports = (sequelize, DataTypes) => {
//     const Post = sequelize.define('Post', { // MySQL에는 users 테이블 생성 (소문자 복수로 저장됨) 
//         // id가 기본적으로 들어있다 . 1,2,3,4,5,
//         content: {
//             type: DataTypes.TEXT,
//             allowNull: false, // 필수
//         },
//         // 1. PostId >> 2. RetweetId 로 바꿔준다.
//     },{
//         charset: 'utf8mb4', // 이모티콘 utf8mb4
//         collate: 'utf8mb4_general_ci'  // 이모티콘 저장
//     });
//     Post.associate = (db) => {
//         // Post는 User에 속해있다.
//         db.Post.belongsTo(db.User);                   // post.addUser, post.getUser, post.setUser (belongsTo는 단수) -시퀄라이즈에서 만들어줌

//         // 1. postId가 생성된다.
//         // db.Post.belongsTo(db.Post); // 리트윗
//         // 2. RetweetId가 생성된다.
//         db.Post.belongsTo(db.Post, { as: 'Retweet'}); // 리트윗 // post.addRetweet (belongsTo는 단수)

//         // belongsToMany : 다대다 관계
//         db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'}); // post.addPostHashtags
//         // 나중에 as에 따라서 post.getLikers처럼 게시글 좋아요 누른 사람을 가져오게됨        
//         db.Post.belongsToMany(db.User, {through: 'Like', as : 'Likers'});// post.addLikers, post.removeLikers 가 생김        
//         // 하나의 게시글에 여러개의 댓글
//         db.Post.hasMany(db.Comment); // post.addComments, post.getComments (hasMany는 복수)
//         db.Post.hasMany(db.Image);   // post.addImages,   post.getImages   (hasMany는 복수)
//     };
//     return Post;
// }