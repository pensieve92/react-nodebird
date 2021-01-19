> ## 섹션 4. 백엔드 노드 서버 구축하기  
>- ### 노드로 서버 구동하기  
npm init
>- ### 익스프레스로 라우팅하기  
npm i express  
postman설치  
swagger 알아보기  
실행 node app

// restAPI 합의  

app.get -> 가져오다.  
app.post -> 생성하다.  
app.put -> 전체수정  
app.delete -> 제거  
app.patch -> 부분수정  
app.options -> 찔러보기  
app.head -> 헤더만 가져오기(헤더/바디)   

// 애매하면 post를 쓴다.  
login 요청은 애매함  
게시글 가져올때, 조회수 1올린다. (get/patch?)  



>- ### 익스프레스 라우터 분리하기  

```javascript
app.js 

// 1. post.js로 분리
app.post('/post', (req, res) => {    
    res.json({id: 1, content: 'hello'});
})


app.delete('/post', (req, res) => {   
    res.json({id: 1});
})

// ...


// 2. 라우터 쪼개기 import
// /post 가 prefix로 붙는다.
app.use('/post', postRouter);
```

```javascript
post.js

router.post('/', (req, res) => {    // POST /post
    res.json({id: 1, content: 'hello'});
})

router.delete('/', (req, res) => {   // DELETE /post
    res.json({id: 1});
})
```
주소중에서 겹친다.
routes폴더안데  
node에선 import, export를 안쓰고, require
>- ### MySQL과 시퀄라이즈 연결하기 
npm i sequelize sequelize-cli mysql2   
// mysql2 : mysql과 node를 연결해주는 드라이버  
// 시컬라이즈 : js로 sql를 조작할 수있게 해주는 라이브러리  

sequelize sequelize-cli 강의는 5버전, 설치는 6버전  

// 시퀄라이저 셋팅
npx sequelize init 
config, migragion, models 폴더 생성됨
config/config.json 설정 :  mySql비밀번호, database설정, operatorsAliases 제거
models/index.js 수정

>- ### 시퀄라이즈 모델 만들기  
>- ### 시퀄라이즈 관계 설정하기  
>- ### 시퀄라이즈 sync + nodemon  
npx sequelize db:create  // /config/config.json 설정에 설정한 db 생성   
erd 툴 : dataGrip  
npm i -D nodemon@2  
실행 nodemon app  
package.json > "dev" : "nodemon app"  
실행 npm run dev  
>- ### 회원가입 구현하기  
- 4개의 주체  
- 브라우져(클라이언트)(3060), 프론트서버(3060), 백엔드서버(3065), 데이터베이스(3306)  
브라우저, 프론트서버는 하나 = 같은 프로그램, 백엔드 하나, 데이터베이스 하나:  각 개별 프로그램

npm i bcrypt  // 암호화 라이브러리

>- ### CORS 문제 해결하기  
CORS문제 다른 도메인으로 요청을 보내면 브라우저가 차단하는 현상  
브라우저에서 도메인이 다른 서버로 요청할 경우 CORS문제가 생긴다.  
프론트 서버에서 백엔드 서버에서 요청할경우 CORS문제가 안생긴다.  

-- 해결방법 
1.PROXY
요청 브라우저 > 프론트 서버 > 백엔드 서버
응답 브라우저 < 프론트 서버 < 백엔드 서버

2. Header에 'Access-Control-Allow-Origin' 추가
console error message  
 Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.  

>- ### 패스포트로 로그인하기  
패스포트 : 카카오, 구글, 네이버, 페북, 트위터, 깃헙, 링크드인 로그인 들을 한번에 관리해줌 
패스포트 로컬 : 이메일과 비밀번호 또는 아이디와 비밀번호 로그인 
npm i passport passport-local  
passport 셋팅

>- ### 쿠키/세션과 전체 로그인 흐름 
npm i express-session  
npm i cookie-parser  
npm i dotenv  
>- ### 로그인 문제 해결하기  

passport-kakao  
passport-google-oauth20  
passport-facebook  

>- ### 미들웨어로 라우터 검사하기  
>- ### 게시글, 댓글 작성하기  
>- ### credentials로 쿠키 공유하기  
도메인이 다르면 쿠키도 전달이 안됨  
백엔드서버는 누가 보냈는지 모름
cors({
    orgin: true,
    credentials: true,
})  
>- ### 내 로그인 정보 매번 불러오기  
1. 새로고침 시, 로그인 풀리는거 해결  
1-1. 새로고침시, 로그인 풀리는문제는 해결됬으나 
순간적으로 로그인화면에서 메인화면으로 넘어가는게 보임
>> 서버사이드 렌더링이 아니라 클라이언트사이드 렌더링이라서 어쩔수 없는 현상
>>> 6강에서 서버사이드 렌더링 해볼예정
2. 게시글 실제 데이터로 불러오기  

>- ### 게시글 불러오기  
npm i morgan  // 프론트에서 백엔드로 요청을 보낼때, 백엔드에 요청을 보냈는지 기록됨

>- ### 게시글 좋아요  
>- ### 게시글 제거 / 닉네임 변경  
>- ### 팔로우 /언팔로우  

>- ### 이미지 업로드를 위한 multer  
npm i multer  // multipart를 백엔드에서 처리
router마다 장착, 폼 마다 이미지를 하나만올릴수도, 여러개할수도, 
app.js 에 장착하지 않음
데이터의 타입이 다르기 때문, 개별적으로 넣음

-- 이미지 업로드 방식  

1. 게시글 등록시, 이미지와 컨텐츠를 등록하는 방식
2. 이미지를 불러올때 먼저 이미지를 업로드하고, 게시글 작성이 완료되면 따로 컨텐츠를 업로드한다. 
2-1. 이미지를 업로드하는 시간이 오래걸리므로, 미리 업로드하는 방법 하지만 이미지 삭제는 안됨..

>- ### express.static 미들웨어  
이미지를 uploads폴더에 업로드는 성공 하였으나, 미리보기가 되지않음  
이미지주소가 http://localhost:3060/매실1610377219393.jpg 임, 백엔드서버는 3065  

postForm.js에 
```javascript
<img src={`http://localhost:3065/${v}`} style={{width: '200px'}} alt={v} />
```
app.js에     
```javascript
 app.use('/', express.static(path.join(__dirname, 'uploads'))); // /back/uploads
 ```

 db에는 파일주소만 가지고 있음  
 db에 이미지를 저장하면 캐싱을 할수 없음

 클라우드에 이미지를 저장
 



>- ### 해시태그 등록하기  
>- ### 리트윗하기  
>- ### 쿼리스트링과 lastId 방식  
 페이징하기
 ```javascript
 // get은 data를 못넣어서 쿼리스트링으로 전달
 // get은 데이터 캐싱이 가능하다. 나머지는 불가능
 // 주소를 캐싱하면 데이터까지 캐싱이 가능하다. get만의 이점
 // 백엔드에서 req.query.lastId로 받는다.
 axios.get(`/post?lastId=${lastId}&limit=10`)
 ```
----