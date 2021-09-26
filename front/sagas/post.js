import axios from 'axios';
import shortId from 'shortId';
import { delay, put, takeLatest, all, fork } from 'redux-saga/effects';
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE 
} from '../reducers/post';
import { ADD_POST_TO_ME,  REMOVE_POST_OF_ME  } from '../reducers/user';



//게시글 추가
function addPostAPI(data){
    return axios.post('/api/post', data)
}
    
function* addPost(action){
    try{
        // const result =   yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data : {   
                id,
                content : action.data,
            },
        });
        yield put({
            type : ADD_POST_TO_ME,
            data : id,
        })
        } catch(err) {
            yield put({//dispatch
                type: ADD_POST_FAILURE,
                data: err.response.data,
            });
        }
    }


    function removePostAPI(data){
        return axios.post('/api/post', data)
    }
        
    function* removePost(action){
        try{
            // const result =   yield call(addPostAPI, action.data);
            yield delay(1000);
            yield put({
                type: REMOVE_POST_SUCCESS,
                data : action.data, //id가 들어가있음(어떤게시글인지)
            });
            yield put({
                type : REMOVE_POST_OF_ME,
                data : action.data,
            });
            } catch(err) {
                console.err(err);
                yield put({//dispatch
                    type: REMOVE_POST_FAILURE,
                    data: err.response.data,
                });
            }
        }



//댓글 추가
function addCommentAPI(data){
    return axios.post(`/api/post/${data.postId}/comment`, data)
}
    
function* addComment(action){
    try{
        // const result =   yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data : action.data,
            });
        } catch(err) {
            yield put({//dispatch
                type: ADD_COMMENT_FAILURE,
                data: err.response.data,
            });
        }
    }



function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST,addPost);
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST,removePost);
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST,addComment);
}



export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}

