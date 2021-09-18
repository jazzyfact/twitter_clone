import { all, fork, call, take } from 'redux-saga/effects';
import axios from 'axios';


//로그인
function loginAPI(data){
    return axios.post('/api/login',data)
}

function* logIn(action){
    try{
        const result =  yield call(logInAPI, action.data);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data,
            });
        } catch(err) {
            yield put({//dispatch
                type: 'LOG_IN_FAILURE',
                data: err.response.data,
            });
        }
    }

//로그아웃
function logOutAPI(){
    return axios.post('/api/logout')
}

function* logOut(){
    try{
        const result =   yield call(logOutAPI);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data,
            });
        } catch(err) {
            yield put({//dispatch
                type: 'LOG_OUT_FAILURE',
                data: err.response.data,
            });
        }
    }

//게시글 추가
function addPostAPI(){
    return axios.post('/api/post')
}
    
function* addPost(){
    try{
        const result =   yield call(addPostAPI);
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data,
            });
        } catch(err) {
            yield put({//dispatch
                type: 'ADD_POST_FAILURE',
                data: err.response.data,
            });
        }
    }

function* watchLogin() {
    yield take('LOG_IN_REQUEST', logIn);//로그인 action이 될 때 까지 기다림
}

function* watchLogOut() {
    yield take('LOG_OUT_REQUEST',logOut);
}

function* watchAddPost(){
    yield take('ADD_POST_REQUEST',addPost);
}

export default function* rootSaga() {
    yield all([//배열에 있는 걸 한번에 실행
        fork(watchLogin),//fork 함수를 실행
        fork(watchLogOut),
        fork(watchAddPost),
    ]);
}