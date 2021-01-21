import { all, fork} from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';
import { backUrl } from '../config/config';

// 백엔드 서버 url 중복 제거
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;


// 이벤트 리스너 등록
export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ]);
}