import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials =true;



export default function* rootSaga() {
    yield all([//배열에 있는 걸 한번에 실행
        //fork 함수를 실행
        fork(postSaga),
        fork(userSaga),
    ]);
}