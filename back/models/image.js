const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Image extends Model{
    static init(sequelize){
        // super 상속받은것(Model) 호출
        return super.init({
            src: {
                type: DataTypes.STRING(200),
                allowNull: false, // 필수
            },   
        }, {
            modelName: 'Image',
            tablename : 'images',
            charset: 'utf8',
            collate: 'utf8_general_ci',  // 이모티콘 저장
            sequelize,  // sequelize를 index.js클래스로 보내줄것 이기 때문에
        })
    }

    static associate(db){
        db.Image.belongsTo(db.Post);
    }
}

// module.exports = (sequelize, DataTypes) => {
//     const Image = sequelize.define('Image', { // MySQL에는 users 테이블 생성 (소문자 복수로 저장됨) 
//         // id가 기본적으로 들어있다 . 1,2,3,4,5,
//         src: {
//             type: DataTypes.STRING(200),
//             allowNull: false, // 필수
//         },        
//     },{
//         charset: 'utf8',
//         collate: 'utf8_general_ci'
//     });
//     Image.associate = (db) => {
//         db.Image.belongsTo(db.Post);

//         // belongsTo
//         // 위 칼럼에 가상?으로 생김
//         // PostId : {}
//     };
//     return Image;
// }