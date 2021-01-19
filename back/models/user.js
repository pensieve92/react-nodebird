const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model{
    static init(sequelize){
        // super 상속받은것(Model) 호출
        return super.init({
            email: {
                type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
                allowNull: false, // 필수
                unique: true // 고유한 값
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false, // 필수
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false, // 필수
            }, 
        }, {
            modelName: 'User',
            tablename : 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',  // 이모티콘 저장
            sequelize,  // sequelize를 index.js클래스로 보내줄것 이기 때문에
        })
    }

    static associate(db){
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, {through: 'Like', as : 'Liked'}); // 중간테이블 이름 지정 // through, as 대문자로 시작
        db.User.belongsToMany(db.User, {through: 'Follow', as : 'Followers', foreignKey: 'FollowingId'}); // foreignKey로 UserId 컬럼명을 바꿔준다.
        db.User.belongsToMany(db.User, {through: 'Follow', as : 'Followings', foreignKey : 'FollowerId'}); // foreignKey로 UserId 컬럼명을 바꿔준다.
    }
}

// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('User', { // MySQL에는 users 테이블 생성 (소문자 복수로 저장됨) // mySql과 시퀄라이즈의 규칙
//         // id가 기본적으로 들어있다. id를 따로 안넣어줌  . 1,2,3,4,5,
//         email: {
//             type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
//             allowNull: false, // 필수
//             unique: true // 고유한 값
//         },
//         nickname: {
//             type: DataTypes.STRING(30),
//             allowNull: false, // 필수
//         },
//         password: {
//             type: DataTypes.STRING(100),
//             allowNull: false, // 필수
//         },
//     },{
//         charset: 'utf8',
//         collate: 'utf8_general_ci'  // 한글 저장
//     });
//     User.associate = (db) => {
//         // User가 Post를 여러개 가질 수 있다.
//         db.User.hasMany(db.Post);
//         db.User.hasMany(db.Comment);

//         db.User.belongsToMany(db.Post, {through: 'Like', as : 'Liked'}); // 중간테이블 이름 지정 // through, as 대문자로 시작
        
//         // 같은 테이블 다대다 관계 : foreignKey 발생
//         // user post 중간 테이블 Like userId, PostId
//         // user user 중간 테이블 Follow userId userId
//         // >> 같은 테이블일 경우 userId가 구분이 안되므로 foreignKey로 이름을 바꿔준다.
//         // through 는 테이블명 변경, foreignKey는 칼럼명 변경        
//         db.User.belongsToMany(db.User, {through: 'Follow', as : 'Followers', foreignKey: 'FollowingId'}); // foreignKey로 UserId 컬럼명을 바꿔준다.
//         db.User.belongsToMany(db.User, {through: 'Follow', as : 'Followings', foreignKey : 'FollowerId'}); // foreignKey로 UserId 컬럼명을 바꿔준다.
//     };
//     return User;
// }