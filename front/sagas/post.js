import { all, take, fork, call, takeLatest, delay, put } from 'redux-saga/effects';
import axios from 'axios';

import {
    ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, 
    ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,  
    LIKE_POST_FAILURE,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS, LOAD_HASHTAG_POSTS_FAILURE,
    LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS,
    LOAD_POST_FAILURE,
    LOAD_POST_REQUEST,
    LOAD_POST_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_USER_POSTS_FAILURE,
    LOAD_USER_POSTS_REQUEST,
    LOAD_USER_POSTS_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    RETWEET_FAILURE,
    RETWEET_REQUEST,
    RETWEET_SUCCESS,
    UNLIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    UPLOAD_IMAGES_SUCCESS,  
} from '../reducers/post';

import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// 이벤트 리스너 등록
export default function* postSaga() {
    yield all([        
        fork(watchUploadImages),
        fork(watchAddPost),
        fork(watchAddComment),
    ]);
}


function uploadImagesAPI(data) {
    // data : imageFormData, {name : data} {}로 감싸면 formData가 아니라 json형태로 되어버려서 안됨
    return axios.post('/post/images', data)
}

function* uploadImages(action) {
    try{    
        const result = yield call(uploadImagesAPI, action.data) 
        yield put({ // effects앞에는 yield
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        })        
    }catch(err){
        yield put({ // effects앞에는 yield
            type: UPLOAD_IMAGES_FAILURE,
            error: err.response.data
        })

    }    
}

// 3. call 로 실행
function addCommentAPI(data) {
    // POST /post/1/comment
    return axios.post(`/post/${data.postId}/comment`, data 
    // {   withCredentials: true, } >> 백엔드로 쿠키 전달 중복 >> sagas/index.js 에서 처리); axios.defaults.withCredentials = true;
    )
}

// 2. 
function* addComment(action) {
    try{    
        //call로 API실행  // effects앞에는 yield
        const result = yield call(addCommentAPI, action.data) 
        
        console.log("addComment", action.data);
        delay(1000);
        yield put({ // effects앞에는 yield
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        })
    }catch(err){
        yield put({ // effects앞에는 yield
            type: ADD_COMMENT_FAILURE,
            error: err.response.data
        })
    }    
}

// 3. call 로 실행
function addPostAPI(data) {
    return axios.post('/post', data // formData는 {}로 감싸면 {content: data} 안되고 바로 data 보내야함
        // {   withCredentials: true, } >> 백엔드로 쿠키 전달 중복 >> sagas/index.js 에서 처리 axios.defaults.withCredentials = true;
    );
}

// 2. 
function* addPost(action) {
    try{    
        const result = yield call(addPostAPI, action.data) //call로 API실행  // effects앞에는 yield
        // delay(1000);
        yield put({ // effects앞에는 yield
            type: ADD_POST_SUCCESS,
            data: result.data
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
        })
    }catch(err){
        yield put({ // effects앞에는 yield
            type: ADD_POST_FAILURE,
            error: err.response.data
        })
    }    
}

function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}


function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

