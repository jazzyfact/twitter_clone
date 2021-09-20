import axios from 'axios';
import { delay, put, takeLatest, all, fork } from 'redux-sata/effects';


//게시글 추가
function addPostAPI(data){
    return axios.post('/api/post', data)
}
    
function* addPost(action){
    try{
        // const result =   yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'ADD_POST_SUCCESS',
            });
        } catch(err) {
            yield put({//dispatch
                type: 'ADD_POST_FAILURE',
                data: err.response.data,
            });
        }
    }



function* watchAddPost(){
    yield tatkLatest('ADD_POST_REQUEST',addPost);
}



export default function* postSaga(){
    yield all([
        fork(watchAddPost),
    ])
}

