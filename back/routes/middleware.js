exports.isLoggedIn = (req, res, next) => {
    // isAuthenticated passport에서 제공 
    // true 이면 로그인 상태
    if(req.isAuthenticated()){
        // 
        next();
    }else {
        // 프론트에서 게시글을 작성할때, 
        // 작성자가 누구인지 모를경우 
        // 쿠키를 백엔드에서 전달 받지 못해서 생길수있는 에러가 있음
        // 백엔드     app.js 에 app.use(cors({ ... credentials : true }))
        // 프론트엔드 sagas/index.js 에 axios.defaults.withCredentials = true;
        res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req, res, next) => {    
    if(!req.isAuthenticated()){
        // next에 인자가 아무것도 없으면, 
        // err로 가는게 아니라 다음 미들웨어로 간다.     
        // 다음 미들웨어 : routes/user 의   
        //                router.post('/login', isNotLoggedIn, (req, res, next) => {
        //                 (req, res, next) => { ... } 이 부분
        next();

        // 인자가 있으면 에러처리 미들웨어로 감
        // app.js에 내부적으로 존재
        // 직접 구현도 가능 
        // app.js 의 app.listen() 바로위에 
        // app.use((err, req, res, next) => { ... })
        // 에러페이지를 따로 띄우고 싶을때

        // next(err);
    }else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
}