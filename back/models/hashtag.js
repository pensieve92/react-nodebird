const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Hashtag extends Model{
    static init(sequelize){
        // super 상속받은것(Model) 호출
        return super.init({
            name: {
                type: DataTypes.STRING(20),
                allowNull: false, // 필수
            },  
        }, {
            modelName: 'Hashtag',
            tablename : 'hashtags',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',  // 이모티콘 저장
            sequelize,  // sequelize를 index.js클래스로 보내줄것 이기 때문에
        })
    }

    static associate(db){
        db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
    }
}
// module.exports = (sequelize, DataTypes) => {
//     const Hashtag = sequelize.define('Hashtag', { // MySQL에는 users 테이블 생성 (소문자 복수로 저장됨) 
//         // id가 기본적으로 들어있다 . 1,2,3,4,5,
//         name: {
//             type: DataTypes.STRING(20),
//             allowNull: false, // 필수
//         },        
//     },{
//         charset: 'utf8mb4',
//         collate: 'utf8mb4_general_ci'  // 이모티콘 저장
//     });
//     Hashtag.associate = (db) => {
//         // {through: 'PostHashtag'} 다대다 관계 테이블 이름
//         // through, as 대문자로 시작
//         db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});

//     };
//     return Hashtag;
// }