export const initialState = {
    mainPosts : [],
}

//이전 state와 action을 받아서 다음 state를 돌려주는 함수
const reducer = (state = initialState, action) => {
    switch (action.type){
        default :
            return state;
    }
};

export default reducer;