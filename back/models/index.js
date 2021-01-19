const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';  // 환경변수 설정 기본값으로 development
const config = require('../config/config')[env]; 
const comment = require('./comment');
const hashtag = require('./hashtag');
const image = require('./image');
const post = require('./post');
const user = require('./user');

const db = {};

// 시퀄라이즈가 node랑 mySql를 연결해줌
// 연결성공시, sequelize 정보를 담아준다.
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// 테이블(mySql) == 모델(시퀄라이즈)을 만들어준다.
// 1. 모델이 시퀄라이즈에 등록
db.Comment = comment;
db.Hashtag = hashtag;
db.Image = image;
db.Post = post;
db.User = user;

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize);
})

// 2. 모델이 시퀄라이즈에 등록
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
