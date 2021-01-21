import { all, take, put, fork, call, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGN_UP_REQUEST, SIGN_UP_FAILURE, SIGN_UP_SUCCESS, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE
} from '../reducers/user';

// 이벤트 리스너 등록
export default function* userSaga() {
    yield all([
        fork(watchLoadUser),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ]);
}

// 2. 
function* signUp(action) {
    try{    
        // effects앞에는 yield
        //call로 API실행  
        // action.data는 function signUpAPI(data) >  data에서 받을수있다.
        const result = yield call(signUpAPI, action.data) 
        console.log(result);
        // yield delay(1000);
        // throw new Error('');
        yield put({ // effects앞에는 yield
            type: SIGN_UP_SUCCESS,
            // data: result.data            
        })
    }catch(err){
        // 서버에서 400, 500 대 응답이 오면 catch로 옴
        yield put({ // effects앞에는 yield
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }    
}

// 3. call 로 실행
function signUpAPI(data) {
    // data : email, password, nickname
    // get, delete는 데이터를 못넘김
    // post, put, patch는 데이터를 넘길수있음    
    // return axios.post('http://3065/user', data);

    // http://localhost:3065 중복 제거 : sagas/index.js
    return axios.post('/user', data);

    // 벡엔드에서 data를 req.body로 받는다.
}
// 3. call 로 실행
function logOutAPI() {
    return axios.post('/user/logout');
}

// 2. 
function* logOut() {
    try{    
        yield call(logOutAPI); //call로 API실행  // effects앞에는 yield
        // yield delay(1000);
        yield put({ // effects앞에는 yield
            type: LOG_OUT_SUCCESS,
            // data: result.data            
        });
    }catch(err){
        console.log('logout err', err);
        yield put({ // effects앞에는 yield
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }    
}

// 3. call 로 실행
function logInAPI(data) {
    return axios.post('/user/login', data); // 백에드 서버로 가면서 data >> req.body 바뀜
}

// 테스트
// const l = logIn({type: 'LOG_IN_REQUEST', data: {id: 'qudgus1447@gmail.com'}})
// l.next();
// l.next();

// 2. 
function* logIn(action) {
    try{    
        const result = yield call(logInAPI, action.data) //call로 API실행  // effects앞에는 yield
        // yield delay(1000);         
        yield put({ // effects앞에는 yield
            type: LOG_IN_SUCCESS,
            data: result.data
            // data: action.data,
        })
    }catch(err){
        yield put({ // effects앞에는 yield
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }    
}
// 3. call 로 실행
function loadUserAPI() {
    // data는 쿠키를 전달해주는데 
    // get, delete는 전달되는 데이터가 없기 때문에 
    // 2번째 자리가 withCredentials : true 자리
    // return axios.get('/user', {withCredentials : true}); 
    return axios.get('/user'); 
}

function* loadUser(action) {
    try{    
        const result = yield call(loadUserAPI, action.data);
        yield put({
            type: LOAD_USER_SUCCESS,
            data: result.data,
        });
    }catch(err){
        yield put({ // effects앞에는 yield
            type: LOAD_USER_FAILURE,
            data: err.response.data,
        })
    }    
}

// 1. 비동기 액션 크리에이터 : 이벤트리스너 같은역할
function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);    // action 자체가 login(action)에 전달// effects앞에는 yield
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    // dispatch한 data를 signUp에서 받는다.
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function* watchLoadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);    // action 자체가 login(action)에 전달// effects앞에는 yield
}