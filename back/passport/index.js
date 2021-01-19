const passport = require('passport');
const local = require('./local');
const { User } = require('../models');

module.exports = () =>{
    // req.login후 실행
    // req.login(user, async(loginErr) => {  
    // req user가 아래 user로 들어감         
    passport.serializeUser((user, done) => {
        // 유저 정보중에서 cookie랑 묶어주는 걸 id만 설정
        // 1. 세션에 다들고 있기 무거워서 user.id만 들고 있는것 
        done(null, user.id);
    });

    // 로그인 성공후, 그 다음 요청부터 매번 실행이 되서, db를 통해서 사용자 정보를 복구
    // 위의 done(null, user.id); 의 user.id가 아래 id로 전달
    passport.deserializeUser(async (id, done)=> {
        try {
            // id를 통해서 User정보를 가져온다.
            // 2. 복원하기 위해서 db user를 복구
            const user = await User.findOne({where : { id }})
            done(null, user);   // req.user안에 넣어준다.         
        } catch (error) {
            console.error(error);
            done(error); // passport는 done으로
        }
        
    })

    local();
}