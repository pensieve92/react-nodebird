> ## 섹션 5. Next.js 서버사이드렌더링  
>- ### 서버사이드렌더링 준비하기  
next redux
next-redux-wrapper가 app.js를 감싸고있음  
이걸로 개별페이지별 서버사이드 렌더링함  
next에세 제공하는 SSR 메서드가 있는데, 리덕스가 같이하면 문제가 있음  
그래서 next-redux-wrapper가 제공하는 SSR용 메서드랑 같이 사용  

>- ### SSR시 쿠키 공유하기  
>- ### getStaticProps 사용해보기  
getStaticProps는 getServerSideProps와 똑같이 서버사이드 렌더링이 가능
getStaticProps는블로그 게시글처럼 웬만하면 안바뀌는 경우,  빌드할때 미리HTML로 만들어 놓음, 서버에 무리가 덜감, 안에 들어있는 정보 안바뀜

대부분 getStaticProps는 잘 안씀 
실시간 어려움, 개인화 페이지, 아마존 상품페이지 재고, 할인 수시로 바뀌면 사용하기 어려움..  

getServerSideProps를 많이씀
>- ### 다이나믹 라우팅  
```javascript
import Head from 'next/head';

    // og.title : 페이지 공유시, 미리보기에 표시되는 정보
    <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
        <meta property="og:description" content={singlePost.content} />
        <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
```
favicon : front/public/favicon.ico  

 
서버사이드렌더링이 될경우, url요청시,  Postman에서html전체를 확인할 수있다.  

>- ### CSS 서버사이드 렌더링  
npm i babel-plugin-styled-components

_document.js
_app.js위에 _document.js가 있음

ie실행 >> ployfill.io
최신문법, 최신객체 > babel로 수정
map, set, promise > babel-polyfill? 너무 무거움 >> polyfill.io

>- ### 사용 게시글, 해시태그 게시글
reducer에서 state 합치기

```javascript
// break를 안걸고, 밑으로 전달해서 state를 합침
case  LOAD_USER_POSTS_SUCCESS:
case  LOAD_HASHTAG_POSTS_SUCCESS:
case  LOAD_POSTS_SUCCESS:
  ...state,

  break;
```


url요청시, 한글 에러 >> encodeURIComponent()로 감싸준다.  

```javascript
return axios(`hashtag/${encodeURIComponent(data)}/?lastId=${lastId || 0}`)
```
>> 나중에 decodeURIComponent()  
```javascript
...
where : { name: decodeURIComponent(req.params.hashtag)},
```

>- ### getStaticPaths  
getStaticProps를 쓰면 무조건 getStaticPaths가 존재해야함  
>> 다이나믹 라우팅일때 getStaticPaths 사용  

getStaticProps는 화면을 미리 빌드해서 html로 만드는데, 다이나믹 라우팅 같은경우에 
처음에 params변수에 들어가는 값이 없기 때문에, 미리 만들어야 할것들을 getStaticPaths에 설정해준다.

```javascript
// getStaticProps가 실행될때 까지 기다려줌 
if(router.isFallback){
  return <div>로딩중 ...</div>
}

...
export async function getStaticPaths() {

  return {
    paths:[         
      {params: {id:'1'}}, // 1번 게시글이 미리 빌드
      {params: {id:'2'}}, // 2번 게시글이 미리 빌드
      {params: {id:'3'}}, // 3번 게시글이 미리 빌드
    ],
    fallback: false, // false : paths에 없는 url요청시: id(4) => error
                     // true  : paths에 없는 url요청시: id(4) => getStaticProps를 실행해서 화면에 그려줌
  }
}

```
>- ### swr 사용해보기  
action이 너무많음 >> swr로 간단하게 load, get요청 편하게 해줌
/front > npm i swr  
next에서 만든 라이브러리  
서버사이드 렌더링도됨  6-12강에 있음
>- ### 해시태그 검색하기  
>- ### moment와 next 빌드하기  
dayjs 요즘 많이 뜨는 라이브러리  

npm i moment

npm run build
>- ### 커스텀 웹팩과 bundle-analyzer  
웹팩 설정
next.config.js
hidden-source-map 안하변 배포환경에서 소스 노출
build 용량 분석 
npm i @next/bundle-anaylzer

build시 next.config.js의 bundle-analyzer 만족하기 위해 package.json build 수정  
"build": "ANALYZE=true NODE_ENV=production next build"  
하지만 windows에서 실행 안됨 >> cross-env 설치  

npm i cross-env  
"build": "cross-env ANALYZE=true NODE_ENV=production next build"  

moment 용량줄이기  
moment locale tree shaking 검색  


>- ### 배포 전 Q&A  
5강 모델코드 최신화
클래스 문법으로 하는 방법

----