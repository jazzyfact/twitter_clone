import shortId from 'shortId';
import produce from 'immer';


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
//이전 상태를 액션을 통해 다음 상태로 만들어내는 함수(불변성은 지키면서)
const reducer = (state = initialState, action) =>  produce(state, (draft) => {
        switch (action.type){
            case ADD_POST_REQUEST : 
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS : 
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.mainPosts.unshift(dummyPost(action.data));
                break;
            case ADD_POST_FAILURE : 
                draft.addPostLoading = true;
                draft.addPostError = action.error;
                break;
            case REMOVE_POST_REQUEST : 
                draft.removePostLoading = false;
                draft.removePostDone =true;
                draft.mainPosts= draft.mainPosts.filter((v) => v.id !== action.data);
                break;
            case REMOVE_POST_SUCCESS :
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case REMOVE_POST_FAILURE : 
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            case ADD_COMMENT_REQUEST : 
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break;
            case ADD_COMMENT_SUCCESS : 
                const post =draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                break;
            case ADD_COMMENT_FAILURE : 
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break;
            default :
                break;
        }
    });   


export default reducer;