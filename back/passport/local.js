const passport = require('passport');
// Strategy 그대로 써도 되고, 이름을 LocalStrategy로 바꿀 수도 있다.
// const { Strategy } = require('passport-local');
// 구조분해시, 변수명 바꾸는 문법
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        // loginForm에서 로그인시 email과 password를 보낸다
        // 서버에서 req.boby.email, req.body.password
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done)=> {
        // await은 항상 try로 감싸주어야 한다.
        try {
            const user =await User.findOne({
                // where: { email: email}            
                where: { email }     // es6문법으로 줄일수 있음       
            });
    
            if(!user){ // user가 없을경우
    
                // passport에서 응답을 보내주지 않는다.
                // res.status().send() X
    
                // done(서버에러, 성공, 클라이언트 에러);
                return done(null, false, {reason: '존재하지 않는 이메일 입니다!'})
            }
    
            // compare도 비동기 함수 await를 붙여주어야한다.
            const result =await bcrypt.compare(password, user.password);
            if(result){
               return done(null, user); 
            }
            return done(null, false, {reason: '비밀번호가 틀렸습니다!!'});
            
        } catch (error) {
            console.log(error);
            return done(error);
        }
        

    }));
}