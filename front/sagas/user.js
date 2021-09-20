import { all, fork} from 'redux-saga/effects';

//로그인
function loginAPI(data){
    return axios.post('/api/login',data)
}

function* logIn(action){
    try{
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
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
        // const result =   yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            });
        } catch(err) {
            yield put({//dispatch
                type: 'LOG_OUT_FAILURE',
                data: err.response.data,
            });
        }
    }


function* watchLogin() {
    yield tatkLatest('LOG_IN_REQUEST', logIn);//로그인 action이 될 때 까지 기다림
}

function* watchLogOut() {
    yield tatkLatest('LOG_OUT_REQUEST',logOut);
}




export default function* userSaga(){
    yield all([
        fork(watchLogin),
        fork(watchLogOut),
    ])
}