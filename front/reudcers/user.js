export const initialState = {

    isLoggedIn : false,
    me : null,
    signUpData :{},
    loginData : {},
}



//user와 관련된 액션
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





//이전 state와 action을 받아서 다음 state를 돌려주는 함수
const reducer = (state = initialState, action) => {
    switch (action.type){
        case 'LOG_IN' :
            return {
                //export const initialState의 depth가 없어서 {} 괄호 삭제 
                ...state,// 이 자체가 user의 state
                isLoggedIn : true,  
                me : action.data,  
            };
        case 'LOG_OUT' :
            return {
                ...state,
                isLoggedIn : false,  
                me :null,
            };   
        default :
            return state;
    }
};

export default reducer;