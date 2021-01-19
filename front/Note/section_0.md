> ## 섹션 0. Hello, Next.js  
- ### 리뉴얼 강좌 소개  
next 버전 8 > 9  
node 14 버전  
ant-design 버전 3 > 4  

브라우저, 
프론트 서버,
백엔드 서버, 
데이터 베이스

전통적인 방식(SSR: Server Side Rendering) 
요청 : 브라우저 > 프론트 서버 > 백엔드 서버 > 데이터 베이스  
응답 : 브라우저 < 프론트 서버 < 백엔드 서버 < 데이터 베이스  

SPA(Single page Application) 방식 (CSR: Client Side Rendering)  [react, vue, angular, ...]  
페이지는 하나이고, 페이지 전환은 눈속임이다.  
하나의 페이지에서 컴포넌트만 교체하는 방식  
먼저 페이지를 받고, 데이터는 로딩 중 데이터를 받아온다.  

요청 : 1. 화면: 브라우저 > 프론트 서버  
응답 : 2. 화면: 프론트 서버 > 브라우저  
요청 : 3. 데이터:  브라우저 > 백엔트 서버 > 데이터베이스  
응답 : 4. 데이터:  브라우저 < 백엔트 서버 < 데이터베이스  


장단점 ..

전체가 한번에 받아올수 있지만, 로딩시간이 오래걸린다.  
화면(로딩창)이 바로 보이지만, 

전체적인 시간이 비슷하거나,  spa방식은 전체 화면을 다가지고 와야해서, spa방식이 더 오래걸릴 수 있다.  

검색엔진 노출  
코드스플리팅  
첫방문만 서버사이드 렌더링, 

>- ### Next.js 역할 소개  
코드스플리팅, 서버사이드 렌더링  
admin페이지는 next필요가 없다.  

>- ### 실전 예제와 준비사항  
node.js 설치  
node -v  > [ v12.18.3 ]  
npm -v  > [ 6.14.6 ]
>- ### Next.js 실행해보기  

$ npm init  
$ npm i next@9  
$ npm i react react-dom
>- ### page와 레이아웃  

>- ### Link와 eslint  
$ npm i prop-types  
  
$ npm i eslint -D  
$ npm i eslint-plugin-import -D  
$ npm i eslint-plugin-react -D  
$ npm i eslint-plugin-react-hooks -D  
  
.eslintrc 설정  
>- ### Q&A  

----