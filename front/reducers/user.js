export const initialState = {
    isLoggingIn : false, //로그인 시도중
    isLoggedIn : false,
    isLoggingOut : false, //로그아웃 시도중
    me : null,
    signUpData :{},
    loginData : {},
}



//user와 관련된 액션
export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

export const logoutRequestAction = (data) => {
    return {
        type: 'LOG_OUT_REQUEST',
    }
}





//이전 state와 action을 받아서 다음 state를 돌려주는 함수
const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOG_IN_REQUEST' :
            return {
                //export const initialState의 depth가 없어서 {} 괄호 삭제 
                ...state,// 이 자체가 user의 state
                isLoggedIn : true,  
            };
         case 'LOG_IN_SUCCESS' :
            return {
                //export const initialState의 depth가 없어서 {} 괄호 삭제 
                ...state,// 이 자체가 user의 state
                isLoggingIn : true,  
                me : {...action.data, nickname: 'heymi'},
            };
         case 'LOG_IN_FAILURE' :
            return {
                //export const initialState의 depth가 없어서 {} 괄호 삭제 
                ...state,// 이 자체가 user의 state
                isLoggingIn : false,
                isLoggedIn : false,   
            };
        case 'LOG_OUT_REQUEST' :
            return {
                ...state,
                isLoggingOut : true,  
              
            };   
        case 'LOG_OUT_SUCCESS' :
            return {
                ...state,
                isLoggingOut : false,
                isLoggedIn : false,  
                me :null,
            }; 
        case 'LOG_OUT_FAILURE' :
            return {
                ...state,
                isLoggingOut : false,
            }; 
        default :
            return state;
    }
};

export default reducer;