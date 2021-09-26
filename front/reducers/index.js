import { HYDRATE} from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post'



//(이전상태, 액션) => 다음상태
//user, post를 combineReducers를 이용해 합쳐 줌
const rootReducer = combineReducers({
    //하이드레이트를 위해서 reducer를 추가, 서버사이드렌더링을 위해서 index 들어감
    index : (state = {}, action ) => {
        switch(action.type) {
            case HYDRATE :
                console.log('HYDRATE', action);
                return { ...state, ...action.payload};
            default :
                return state;
         }
    },
    user,
    post,
    
});

export default rootReducer;