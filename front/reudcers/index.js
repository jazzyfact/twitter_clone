import { HYDRATE} from 'next-redux-wrapper';

const initialState ={
  user: {
      isLoggedIn : false,
      user : null,
      signUpData :{},
      loginData : {},
  },
  post : {
      mainPosts : [],
  }
};

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}

export const logoutAction = (data) => {
    return {
        type: 'LOG_OUT',
    }
}




//(이전상태, 액션) => 다음상태
const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case HYDRATE :
            console.log('HYDRATE', action);
            return { ...state, ...action.payload};
        case 'LOG_IN' :
            return {
                ...state,
                user : {
                    ...state.user, //참조관계 유지, 안바꾸고싶은것
                    isLoggedIn : true,  //내가바꾸고싶은것
                    user : action.data,
                }       
            };
        case 'LOG_OUT' :
            return {
                ...state,
                user : {
                    ...state.user, //참조관계 유지, 안바꾸고싶은것
                    isLoggedIn : false,  //내가바꾸고싶은것
                    user :null,
                },       
            };   
        default :
            return state;
     }
};

export default rootReducer;