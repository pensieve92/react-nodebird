const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts'); // 단수 복수 구분하는 스타일
const userRouter = require('./routes/user');
const  db = require('./models');
const passportConfig = require('./passport');

// .env 사용 설정
dotenv.config();

const app = express();
 
// db 시퀄라이즈 연결
db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공!!');
    })
    .catch(console.err);

passportConfig();

// app.use : express서버에 먼가를 장착한다는 의미, 순서중요

app.use(morgan('dev')); 

// app.use(cors()); // 모든 요청 허용 = res.setHeader('Access-Control-Allow-Origin', '*')
// app.use(cors()); // 쿠키 전달 허용 = res.setHeader('Access-Control-Allow-credentials',  true)
app.use(cors({
    // origin: '*', // credentials: true 이면 *를 사용할 수 없음
    origin: true,   // true : * 대신 보낸 곳의 주소가 자동으로 들어가 편리 

    // credentials: false // 기본값 false, 하지만 아예 안 적으면 어떤 문제가 생김    
    // 요청을 보낸사람이 누구인지 알려면 쿠키를 보내야 되는데, 
    // 그럴려면 프론트에선  axios에서 withCredentials : true
    //          백엔드에선 cors에서  credentials : true 
    credentials: true     // 쿠키를 다른 도메인간 전달 허용

    // saga에서도 { withCredentials : true } 를 넣어주어야한다.

    // sagas/post.js
    // function addPostAPI(data) {
    //     return axios.post('/post', {content: data}, {
    //         withCredentials: true, 
    //     });
    // }
    
    // 결국 이것도 중복 발생임.. >> sagas.index.js
    // axios.defaults.withCredentials = true

}));

// __dirname : /back 
// path.join( window, mac, linux 운영체제에 따라 구분자가 다름
// '/' : localhost:3065/ 
// 프론트에서 src={`http://localhost:3065/${v}`로 요청 할 경우 
app.use('/', express.static(path.join(__dirname, 'uploads'))); // /back/uploads


// 프론트에서 data를 req.body로 넣어주는 역할
// 위치가 아래 있으면 안됨 라우터보다 위에 있어야함
// req.body에 있는상태에서 app.use('/post', postRouter); 가 실행되어야함

// 프론트에서 json형태로 보냈을때 req.body에 넣어줌
app.use(express.json()); 
// form submit했을때 urlencoded방식으로 넘어오는데, 
// form을 사용했을 때 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); 

// session과 cookie
// session : 백엔드의 정보
// cookie  : 백엔드의 정보를  복원할 수있는 키
// 로그인시 브라우져랑 서버랑 같은 정보를 가지고 있어야 한다.
// 브라우저는 누구나 접근할 수 있어 해킹에 취약함
// 위험한 곳(브라우저)에는 랜덤한 문자열(cookie)을 보내주고,
// 그거를 받아서 백엔드에서 원래데이터(session)를 복원할 수있게 하여 사용자를 식별한다.
// 백엔드서버에서 브라우저로 정보를 주는데 난잡한 문자열로 준다.( 백엔드의 세션 )

// cookie 설정
app.use(cookieParser(process.env.COOKIE_SECRET));
// session 설정
app.use(session(
    {
        saveUninitialized: false,
        resave: false,
        // 랜덤한 문자 cookie를 보내준다고 했는데, cookie는 데이터를 기반으로 만들어낸 문자 
        // secret이 해킹당하면 데이터가 노출될 수 있다
        // cookie랑 secret을 알면 데이터를 복원할 수있다. >> 해킹 위협
        // >> dotenv
        // secret은 cookieParser에도 동일하게 들어감
        // .env 의 COOKIE_SECRET=nodebirdsecret
        // .env 파일은 github에 올리면 안되고, 소중히 
        secret: process.env.COOKIE_SECRET, 
    }
));
app.use(passport.initialize());
app.use(passport.session());



// http.createsServer((req, res) => { 를 사용   
// if(req.method === 'GET'){
//     if(req.url === '/api/posts')
// } else if (req.method === 'POST'){ 
//      if(req.url === 'api/post'){
//           ...
//      }
//  }

// express 프레임워크 사용
// app에 .get, .post, .delete 등을 붙여서 사용할 수 있다.
app.get('/', (req, res) => {
    // res.send('hello express');

    // 데이터는 json으로 응답
    // 보통 api는 json을 응답
    res.json('홈');
})

// 라우터 쪼개기
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

// err 처리 미들웨어
// app.use((err, req, res, next) => {

// })

app.listen(3065, () => {
    console.log('서버 실행 중');
})