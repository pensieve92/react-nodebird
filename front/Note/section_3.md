> ## 섹션 3. Redux-saga 연동하기
>- ### redux-thunk 이해하기  
redux-thunk 리덕스의 기능을 향상시켜주는 middleware  
middleware는 기존에 없는 기능을 추가하는 것이다.
redux-thunk는 리덕스가 비동기 액션을 dispatch할수 있도록 도와주는 역할
redux-saga를 많이 사용함
thunk 지연의 의미를 가짐
하나의 비동기 액션안에 동기 액션 여러개를 요청 할 수 있다. 

redux-thunk
```javascript  
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```
$ npm i redux-thunk  
$ npm rm redux-thunk


>- ### saga 설치하고 generator 이해하기  
$ npm i redux-saga
$ npm i next-redux-saga
$ npm rm next-redux-saga // 필요없어짐

generator
```javascript
const gen = function* (){};
// gen()
// gen().next()   //{value: undefined, done: false}
```

```javascript
const gen = function* (){
  consoel.log(1);
  yield;
  console.log(2);
  yield;
  console.log(3);
  yield 4;
};

const generator = gen();

generator.next(); // 1 {value: undefined, done: false}
generator.next(); // 2 {value: undefined, done: false}
generator.next(); // 3 {value: 4, done: false}
generator.next(); // {value: undefined, done: true}
```
사가에서는 절대 멈추지않는 generator
무한의 개념을 포함 >> 이벤트 리스너
```javascript
const gen = function*(){
  while(true){
    yield '무한';
  }
}

const g = gen();
g.next(); // {value: '무한', done: false}

let i = 0;
const gen = function*(){
  while(true){
    yield i++;
  }
}

const g = gen();
g.next(); // {value: 0, done: false}
g.next(); // {value: 1, done: false}
g.next(); // {value: 2, done: false}
g.next(); // {value: 3, done: false}
g.next(); // {value: 4, done: false}
g.next(); // {value: 5, done: false}
...
```
$ npm i axios
```javascript
all: 배열안에 있는 것을 한방에 실행
fork: 함수실행
call: 
take:  함수가 실행될때 까지 기다리겠다
put : dispatch 역할
delay : setTimeout 역할
debounce
throttle
takeLatest
takeEvery
takeMaybe
```

```javascript
call 과 fork차이

// call // 동기(결과를 기다린후 다음 실행)
function* logIn() {
  // const result = yield call(logInAPI) 
  axios.post('/api/login')
    .then(() => {
      yield put({ 
        type: 'LOG_IN_SUCCESS',
        data: result.data
      })
  })
}   

// fork // 비동기 (결과를 기다리지 않고 다음 실행)
function* logIn() {
    // const result = yield fork(logInAPI) 
    axios.post('/api/login');   // result가 없음
    yield put({ 
        type: 'LOG_IN_SUCCESS',
        data: result.data
    })
  }    
}
```

>- ### saga 이펙트 알아보기  

>- ### take, take 시리즈, throttle알아보기  

```javascript
// 일회용
function* watchLogIn() {
    yield take('LOG_IN_REQUEST', logIn);
}

// 이벤트 리스너 역할
function* watchLogIn() {
  while(true){
    yield take('LOG_IN_REQUEST', logIn);  //동기적 동작
  }    
}

//  이벤트 리스너 역할 while대체
function* watchLogIn() {  
    yield takeEvery('LOG_IN_REQUEST', logIn);  // 비동기적 동작
}

// takeLatest
//  이벤트 리스너 역할 // 앞에 실수2번클릭방지 무시 마지막건만 알아서 실행
// 동시에 로딩중인 것만 취소 실행
// 프론트에서만 그렇게 생각, 서버에서는 insert됨
// 프론트에서 요청을 2개 보낼 경우 응답이 2개가 와야 정상
// 응답 1개를 취소, 요청을 취소하지 않아 데이터가 2번 저장됨 >> 서버에서 검사필요
// 요청까지 취소를 하지 못함
function* watchLogIn() {  
    yield takeLatest('LOG_IN_REQUEST', logIn);  
}

// takeLeading
//  이벤트 리스너 역할 // 앞에 실수 무시 앞에 건만 실행
function* watchLogIn() {  
    yield takeLeading('LOG_IN_REQUEST', logIn);  
}

// throttle
//  이벤트 리스너 역할 // 2초동안 1번만 실행 // 요청을 제한 할 수 있음
function* watchLogIn() {  
    yield throttle('LOG_IN_REQUEST', logIn, 2000);  
}
```
throttle과 debounce 차이  
throttle > 스크롤링 : 마지막 함수가 호출된 후 일정 시간이 지나기 전에 다시 호출되지 않도록 하는것  
debounce > 검색 자동완성 : 연이어 호출되는 함수들 중 마지막 함수(또는 제일 처음)만 호출하도록 하는 것  

>- ### saga 쪼개고 reducer와 연결하기  

>- ### 액션 상태 정리하기  
>- ### 바뀐 상태 적용하고 eslint 점검하기  
$ npm i -D babel-eslint eslint-config-airbnb eslint-plugin-import  
$ npm i -D eslint-plugin-react-hooks
$ npm i -D eslint-plugin-jsx-a11y

>- ### 게시글, 댓글 saga 작성하기 
npm i faker shortid 
>- ### 게시글 삭제 saga 작성하기  
>- ### immer 도입하기  
>- ### faker로 실감나는 더미데이터 만들기  
>- ### 인피니트 스크롤링 적용하기  
>- ### 팔로우, 언팔로우 구현하기  
----