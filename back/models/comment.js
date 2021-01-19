const DataTypes = require('sequelize');
const { Model } = DataTypes;


module.exports = class Comment extends Model{
    // Comment의 init이 아니라 Model의 init 호출
    // sequelize.define >> static init으로 변경
    static init(sequelize){
        // super 상속받은것(Model) 호출
        return super.init({
            comment: {
                type: DataTypes.TEXT,
                allowNull: false, // 필수
            },
        }, {
            modelName: 'Comment',
            tablename : 'comments',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',  // 이모티콘 저장
            sequelize,  // sequelize를 index.js클래스로 보내줄것 이기 때문에
        })
    }

    static associate(db){
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
}

// module.exports = (sequelize, DataTypes) => {
//     const Comment = sequelize.define('Comment', { // MySQL에는 users 테이블 생성 (소문자 복수로 저장됨) 
//         // id가 기본적으로 들어있다 . 1,2,3,4,5,
//         comment: {
//             type: DataTypes.TEXT,
//             allowNull: false, // 필수
//         },
//         // belongsTo가 들어가면 여기에 가상의 칼럼이 생긴다.
//         // UserId: {}
//         // PostId: {}
//     },{
      
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci',  // 이모티콘 저장,
//     });
//     Comment.associate = (db) => {
//         // 어떤 댓글은 작성자가 있다. 
//         // belongsTo : 위 칼럼에 가상으로 생김 (UserId: {})
//         db.Comment.belongsTo(db.User);
//         // 어떤 댓글은 게시글이 있다. 
//         // belongsTo : 위 칼럼에 가상으로 생김 (PostId: {})
//         db.Comment.belongsTo(db.Post);
//     };
//     return Comment;
// }