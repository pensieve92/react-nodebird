> ## 섹션 1. antd 사용해 SNS 화면 만들기 
>- ### antd와 styled-components    
$ npm i antd styled-components @ant-design/icons  
>- ### _app.js와 Head  
_app.js는 공통적인 부분을 관리한다.
_app.js의  {Component} 는 index.js, profile.js, signup.js
_app.js는 page폴더의 index.js, profile.js, signup.js의 부모역할이 된다.

 App
    index
    profile
    signup


Layout과 _app.js 역할이 다르다.
_app.js > pages들의 공통 부분
Layout  > 일부가 공통인 것들

import Head from 'next/head';

>- ### 반응형 그리드 사용하기  
xs : 모바일
sm : 태블릿
md : 작은 데스크탑
>- ### 로그인 폼 만들기  
페이지가 아닌것들은 components 폴더에 
나중에 라이브러리를 쓰는것을 추천
>- ### 리렌더 이해하기  

>- ### 더미 데이터로 로그인하기  
>- ### 크롬 확장프로그램과 Q&A  
react, redux  
antd, echart, vue  
>- ### 프로필 페이지 만들기  
>- ### 회원가입 페이지 만들기(커스텀 훅)  
훅 조건  
반복, 조건, 함수 안에서는 안됨  
컴포넌트 안에서만 가능(한 단계)   
* 유일한 예외가 커스텀 훅
```javascript
const LogginForm = ({setIsLoggedIn}) => {

    const [id, setId] = useState('pensieve92@gmail.com');
    const [password, setPassword] = useState('123123');

    const onChangeId = useCallback((e)=> {
        setId(e.target.value);
    }, []);
    const onChangePassword = useCallback((e)=> {
        setPassword(e.target.value);
    }, []);

    ...
}

```
----