//더미데이터 넣어두기
export const initialState = {
    mainPosts : [{
        id: 1,
        User: {
            id:1,
            nickname : 'hyemi',
        },
        content : '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
          }
          , 
          {
            src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
          }, 
          {
            src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
          }
        ],
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
    addPostLoading : false, //게시물 추가가 완료 됐을 때
    addPostDone : false,
    addPostError : null,
}

//action 이름을 상수로 빼준 이유
//1.오타 방지,
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';


export const addPost = (data) => ({
    type : ADD_POST_REQUEST,
    data,
});

export const addComment = (data) => ({
    type : ADD_COMMENT_REQUEST,
    data,
});

const dummyPost = {
    id : 1,
    content: '더미데이터입니다.',
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
        case ADD_POST_REQUEST : 
            return {
                ...state,
                addPostLoading : true,
                addPostDone : false,
                addPostError : null,
            }

        case ADD_POST_SUCCESS : {
            return {
                ...state,
                mainPosts : [dummyPost, ...state.mainPosts], //앞에 써야 맨 위로 올라감
                addPostLoading: true,
                addPostDone : true,
            };
        }
        case ADD_POST_FAILURE : 
            return {
                ...state,
                addPostLoading : true,
                addPostError : action.error,
            }

        case ADD_COMMENT_REQUEST : 
            return {
                ...state,
                addCommentLoading : true,
                addCommentDone : false,
                addCommentError : null,
            }

        case ADD_COMMENT_SUCCESS : {
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone : true,
            };
        }
        case ADD_COMMENT_FAILURE : 
            return {
                ...state,
                addCommentLoading : true,
                addCommentError : action.error,
            }
        default :
            return state;
    }
};

export default reducer;