//더미데이터 넣어두기
export const initialState = {
    mainPosts : [{
        id: 1,
        User: {
            id:1,
            nickname : 'hyemi',
        },
        content : '첫 번째 게시글 #해시태그 #익스프레스',
        Images : [{
            src : './images/sea.jpg',
            src : './images/sunset.jpg',
            src : './images/mountains.jpg',
        }],
        Comments : [{
            User : {
                nickname : 'beenzino'
            },
            content : '노래 많이 들어주세요',
        }, {
            User : {
                nickname :'esens',
            },
            content :'노래많이들어주세요~'
        }]
    }],
    imagePaths : [], //이미지 경로
    postAdded : false, //게시물 추가가 완료 됐을 때
}

//action 이름을 상수로 빼준 이유
//1.오타 방지,
const ADD_POST = 'ADD_POST';
export const addPost = {
    type : ADD_POST,
}

const dummyPost = {
    id : 1,
    User : {
        id :1,
        nickname : 'hyemi',
    },
    Images : [],
    Comments :[],
}

//이전 state와 action을 받아서 다음 state를 돌려주는 함수
const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST :
            return {
                ...state,
                mainPosts : [dummyPost, ...state.mainPosts], //앞에 써야 맨 위로 올라감
                postAdded: true,
            };
        default :
            return state;
    }
};

export default reducer;