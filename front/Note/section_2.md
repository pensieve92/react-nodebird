> ## 섹션 2. Redux 연동하기  
>- ### 리덕스 설치와 필요성 소개  
리덕스 중앙데이터 저장소 역할
그외에 react의 context-API, 리덕스, 몹엑스, 아폴로  
컴포넌트별 데이터 관리

비동기요청이 많다 >> 리덕스, 몹엑스  
화면을 비즈니스 로직과 분리, 데이터는 부모로 부터 받거나 훅으로 부터 받고 화면만 그려주고, 데이터는 중앙데이터 저장소에서 관리

$ npm i next-redux-wrapper
$ npm i redux

>- ### 리덕스의 원리와 불변성  
액션을 dispatch > reducer > store수정
불변성 ...{} > 참조를 유지해서 메모리 낭비를 막는다.

>- ### 리덕스 실제 구현하기  
리듀서 : 이전상태와 액션으로 다음상태로 만들어 주는 함수

$ npm i react-redux
>- ### 미들웨어와 리덕스 데브툴즈  
리덕스 > 액션기록 > 미들웨어 등록
$ npm i redux-devtools-extension 브라우저 개발자도구와 연동

포트변경 
package.json > script.dev = "next -p 3060"

>- ### 리듀서 쪼개기  
```javascript
    // AppLayout.js    
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
```
비구조활당
```javascript
    // AppLayout.js    
    const {isLoggedIn} = useSelector((state) => state.user); // 비구조 할당
```
>- ### 더미데이터와 포스트폼 만들기  

>- ### 게시글 구현하기  
>- ### 댓글 구현하기  
>- ### 이미지 구현하기  
>- ### 이미지 캐루셀 구현하기(react-slick)  
$ npm i react-slick
>- ### 글로벌 스타일과 컴포넌트 폴더 구조  
>- ### 게시글 해시태그 링크로 만들기  
정규 표현식 regexr.com
----