const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');


// const db = require('../models');
// db.User 구조분해 할당
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn} = require('./middleware');
const db = require('../models');

const router = express.Router();

// 로그인 정보 가져오기 >> front/pages/index.js
// 로그아웃 상태에서는 가져오면 안됨 
router.get('/', async(req, res, next) => { // GET /user
    try {
        if(req.user){ // 2. 사용자 상태 확인
            // const user = await User.findOne({
            //     where : {id: req.user.id} // 1. 로그아웃 상태에서 에러 
            // })
            const fullUserWithoutPassword = await User.findOne({
                where : {id: req.user.id},
                // attributes: ['id', 'nickname', 'email'],
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    // hasMany가 model: Post가 복수형이 되어 me.Posts가 됨
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User, 
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers',
                    attributes: ['id'],
                }]
            })
            res.status(200).json(fullUserWithoutPassword);        
        }else{
            res.status(200).json(null);
        }
    } catch (error) {
        console.log(error);
        next(error); 
    }
});


router.get('/followers', isLoggedIn, async(req, res, next) => { // GET /user/followers
    try {
        const user = await User.findOne({ where : {id: req.user.id}});
        if(!user){
            return res.status(403).send('없는 사람을 팔로우하려고 하시네요');
        }
        // addFollower 단수는 될 수 도 있음
        // addFollowers 복수는 무조건 됨
        const followers = await user.getFollowers({
            limit: parseInt(req.params.limit,10),
        });
        return res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/followings', isLoggedIn, async(req, res, next) => { // GET /user/followings
    try {
        const user = await User.findOne({ where : {id: req.user.id}});
        if(!user){
            return res.status(403).send('없는 사람을 팔로우하려고 하시네요');
        }
        // addFollower 단수는 될 수 도 있음
        // addFollowers 복수는 무조건 됨
        const followings = await user.getFollowings({
            limit: parseInt(req.params.limit, 10),
        });
        return res.status(200).json(followings);
    } catch (error) {
        console.error(error);
        next(error);
    }
});



// 로그인은 passport전략을 사용해서 일반 요청과 다르다.

// 1. 일반 요청
// router.post('/login', async(req, res, next) => { // POSt /user/login
// })

// (err, user, info) 는 local.js의 done(서버에러, 성공, 클라이언트 에러);
// err, user, info 이름은 마음대로 해도 노상관
// 2. passport전략을 사용
// router.post('/login', passport.authenticate('local', (err, user, info)=> {
//     if(err){
//         console.log(error);
//         next(error); // next변수가 없다... res도 없다...        
//     }
// }));

// 3. 미들웨어 확장 - (req, res, next) 사용하기
// express 기법 중 하나

// isNotLoggedIn 미들웨어 추가
// 미들웨어는 위에서 아래로, 왼쪽에서 오른쪽으로
router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (err, user, info)=> {
        if(err){
            console.log(error);
            return next(error);         
        }
        if(info){
            return res.status(401).send(info.reason);
        }

        // passport에서 로그인 할 수 있도록 허락        
        // 서비스 로그인이 아니라, passport로그인
        return req.login(user, async(loginErr) => {           
            if(loginErr){
                console.error(loginErr)
                return next(loginErr);
            }
            const fullUserWithoutPassword = await User.findOne({
                where : {id: user.id},
                // attributes: ['id', 'nickname', 'email'],
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    // hasMany가 model: Post가 복수형이 되어 me.Posts가 됨
                    model: Post,
                    attributes: ['id'],
                }, {
                    model: User, 
                    as: 'Followings',
                    attributes: ['id'],
                }, {
                    model: User,
                    as: 'Followers', 
                    attributes: ['id'],
                }]
            })
            console.log("fullUserWithoutPassword", fullUserWithoutPassword);
            // 사용자 정보를 프론트로 넘겨줌
            return res.status(200).json(fullUserWithoutPassword);

            // req.login에서 내부적으로
            // res.setHeader('Cookie', 'cxlhy') 
            // 를 보내주고, 알아서 세션에 연결
            // 보안의 위협을 최소화
            // Response Header에 Set-cookie: connect.sid

            // passport 세션정보를 들고 있으면 너무 무거움
            // 사용자 정보가 많아지면, 메모리가 버티지 못함
            
            // >> 서버쪽에서 cookie에다가 id만 매칭해 놓는다.
            // db로 가서 데이터를 복구한다.

            // 나중에는 아예 세션 저장용 DB로 redis를 사용한다.

        })
    })(req, res, next);
});


// 회원가입
router.post('/', isNotLoggedIn, async (req, res, next) => {    // POST /user >> http://localhost:3065/user
    console.log(req.headers); // header안에 쿠키가 들어있음
    // await붙는 얘들은 비동기 try catch로 감싸준다.
    try{
        // email 중복확인
        // await : 어떤 함수가 비동기인지, 아닌지 문서를 통해서 찾아봐야한다.
        // findOne : 있으면 데이터가 들어가고, 없으면 null
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            }
        });
        
        if(exUser){            
            // return 을 안하면 밑으로 진행
            // 응답을 2번 하게됨 >> error 메세지 (can't set headers already sent)
            // res.status(403).send('이미 사용중인 아이디입니다.');
            // res.send('ok');

            // status(403) : 상태코드            
            // send(이미 사용중인 아이디입니다.) : 데이터
            // 상태코드를 먼저 보내고, 데이터를 보낸다.
            // 요청 / 응답은 헤더(상태, 용량, 시간, 쿠키)와 바디(데이터)로 구성되어있다.

            // res.send('ok'); 은 원래 res.status(200).send('ok');            

            // http 상태 코드 확인하기 (MDN)
            // 200 성공
            // 300 리다이렉트, 캐싱
            // 400 클라이언트 에러
            //  401 비인증
            //  403 허용되지 않은 요청            
            // 500 서버 에러

            // 브라우져에서 잘못 보냈기 때문에 403
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }

        // bcrypt도 비동기 > await을 붙여주어야한다.
        // await bcrypt.hash(req.body.password, 12);
        // 숫자는 10 ~ 13 높을수록 암호화가 강하다 but 시간이 오래 걸릴수 있다.
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        // await >> 실제로 데이터가 들어감 
        // await을 쓸라면 async함수로 만들어 줘야함
        // create >> insert
        await User.create({
        email: req.body.email,
        nickname: req.body.nickname,
        password: hashedPassword,
        })
        // await을 안붙이면 응답이 오기전에 res.json()이 실행된다.
        // res.json();


        // CORS 문제 해결
        // Access-Control-Allow-Origin
        // 차단은 브라우저가 차단하는데, 허용은 서버에서 해줘야한다.
        // '*' 모든 요청 허용
        // res.setHeader('Access-Control-Allow-Origin', '*')        
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3060');
        // 미들 웨어로 처리 >> npm i cors

        // res.send('ok');
        // .status(200) 생략 가능하나 안하는것을 추천
        // 200은 그냥 성공
        // 201를 잘 생성된 의미 > 의미를 두고싶을때(잘 만들었다~)
        res.status(201).send('ok');            


        

    } catch (error){
        console.log(error);
        // next를 통해서 error를 보내면 error들이 한방에 처리됨
        // error가 발생하면 express가 브라우저로 error를 알려줌
        next(error); // res.status : 500 

    }
    
})

// passport의 deserializeUser에서 req.user를 담아준다.
router.post('/logout', isLoggedIn, (req, res) => {
    console.log(req.user);
    req.logout();
    req.session.destroy();
    res.send('ok');
})


router.patch('/nickname', isLoggedIn, async(req, res, next) => { // PATCH /user/nickname
    try {
        await User.update({
            nickname: req.body.nickname,            
        }, {
            where: {id: req.user.id}, 
        })        
        res.status(200).json({nickname: req.body.nickname});
    } catch (error) {
        console.error(error);
        next(error);
    }
})



 


router.delete('/follower/:userId ', isLoggedIn, async(req, res, next) => { // DELETE /user/follower/1
    try {
        const user = await User.findOne({ where : {id: req.params.userId}});
        if(!user){
            return res.status(403).send('없는 사람을 팔로우하려고 하시네요');
        }        
        await user.removeFollowings(req.user.id);
        return res.status(200).json({UserId: parseInt(req.params.UserId, 10)});
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// id가 userId인 user를 follow
router.patch('/:userId/follow', isLoggedIn, async(req, res, next) => { // PATCH /user/1/follow
    try {
        const user = await User.findOne({ where : {id: req.params.userId}});
        if(!user){
            return res.status(403).send('없는 사람을 팔로우하려고 하시네요');
        }
        // addFollower 단수는 될 수 도 있음
        // addFollowers 복수는 무조건 됨
        await user.addFollowers(req.user.id);
        return res.status(200).json({id: req.params.userId});
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// id가 userId인 user를 follow해제 하겠다.
router.delete('/:userId/follow', isLoggedIn, async(req, res, next) => { // DELETE /user/1/follow
    try {
        const user = await User.findOne({ where : {id: req.params.userId}});
        if(!user){
            res.status(403).send('없는 사람을 언팔로우하려고 하시네요');
        }
        await user.removeFollowers(req.user.id);
        return res.status(200).json({id: parseInt(req.params.userId, 10)});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router
