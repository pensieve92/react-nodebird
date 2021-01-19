// dotenv를 사용하기 위해 config.json >> config.js로 확장자 변경
// module.exports 붙이기
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "node-bird",
    "host": "127.0.0.1",    
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "node-bird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "node-bird",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
