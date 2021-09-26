import shortId from 'shortId';


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
            id : shortId.generate(),
            src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
          }
          , 
          {
            id : shortId.generate(),
            src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
          }, 
          {
            id : shortId.generate(),
            src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
          }
        ],
        Comments : [{
            id : shortId.generate(),
            User : {
                id : shortId.generate(),
                nickname : 'beenzino'
            },
            content : '노래 많이 들어주세요',
        }, {
            id : shortId.generate(),
            User : {
                id : shortId.generate(),
                nickname :'esens',
            },
            content :'노래많이들어주세요~'
        }]
    }],
    imagePaths : [], //이미지 경로
    addPostLoading : false, //게시물 추가가 완료 됐을 때
    addPostDone : false,
    addPostError : null,
    removePostLoading : false, //게시물 추가가 완료 됐을 때
    removePostDone : false,
    removePostError : null,
    addCommentLoading : false, //댓글 추가가 완료 됐을 때
    addCommentDone : false,
    addCommentError : null,
}

//action 이름을 상수로 빼준 이유
//1.오타 방지,
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

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

const dummyPost = (data) => ({
        id : data.id,
        content: data.content,
        User : {
            id :1,
            nickname : 'hyemi',
        },
        Images : [],
        Comments :[],
    });

const dummyComment = (data) => ({
        id : shortId.generate(),
        content: data,
        User : {
            id :1,
            nickname : 'hyemi',
        },
    }); 

//이전 state와 action을 받아서 다음 state를 돌려주는 함수
const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST_REQUEST : 
            return {
                ...state,
                addPostLoading : true,
                addPostDone : false,
                addPostError : null,
            };

        case ADD_POST_SUCCESS : {
            return {
                ...state,
                mainPosts : [dummyPost(action.data), ...state.mainPosts], //앞에 써야 맨 위로 올라감
                addPostLoading: false,
                addPostDone : true,
            };
        }
        case ADD_POST_FAILURE : 
            return {
                ...state,
                addPostLoading : false,
                addPostError : action.error,
            };
        case REMOVE_POST_REQUEST : 
            return {
                ...state,
                removePostLoading : true,
                removePostDone : false,
                removePostError : null,
            };

        case REMOVE_POST_SUCCESS : {
            return {
                ...state,
                mainPosts : state.mainPosts.filter((v) => v.id !== action.data),
                removePostLoading: false,
                removePostDone : true,
            };
        }
        case REMOVE_POST_FAILURE : 
            return {
                ...state,
                removePostLoading : false,
                removePostError : action.error,
            };

        case ADD_COMMENT_REQUEST : 
            return {
                ...state,
                addCommentLoading : true,
                addCommentDone : false,
                addCommentError : null,
            };

        case ADD_COMMENT_SUCCESS : {
            // action.data.content, postId, userId
            const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
            const post = state.mainPosts[postIndex];
            post.Comments = [dummyComment(action.data.content), ...post.Comments];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone : true,
            };
        }
        case ADD_COMMENT_FAILURE : 
            return {
                ...state,
                addCommentLoading : false,
                addCommentError : action.error,
            }
        default :
            return state;
    }
};

export default reducer;