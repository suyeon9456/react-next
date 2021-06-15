const initialState = {
  isAddingPost: false,
  isAddedPost: false,
  isAddingPostError: null,
  isAddingComment: false,
  isAddedComment: false,
  isAddingCommentError: null,
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초'
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images: [{
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg'
    }],
    Comments: [{
      User: {
        nickname: 'nero'
      },
      content: '우와 개정판이 나왔군요~'
    }, {
      User: {
        nickname: 'hero'
      },
      content: '얼른 사고싶어요~'
    }]
  }],
  imagePaths: [],
  postAdded: false
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const addPost = {
  type: ADD_POST_REQUEST
};

export const addComment = (data) => {
  return {
    type: ADD_COMMENT_REQUEST,
    data: data
  }
}

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: 'suyeon',
  },
  Images: [],
  Comments: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        isAddingPost: true,
        isAddedPost: false,
        isAddingPostError: null
      }
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isAddingPost: false,
        isAddedPost: true,
        mainPosts: [dummyPost, ...state.mainPosts]
        // postAdded: true
      }
    case ADD_POST_ERROR:
      return {
        ...state,
        isAddingPost: false,
        isAddingPostError: action.error
      }
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        isAddingComment: true,
        isAddedComment: false,
        isAddingCommentError: null
      }
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isAddingComment: false,
        isAddedComment: true,
        mainPosts: state.mainPosts.map((post) => {
          return post.id === action.data.postId
            ? {
                ...post,
                Comments: [...post.Comments, { User: { nickname: action.data.id }, content: action.data.comment }]
              }
            : post
        })
      }
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        isAddingComment: false,
        isAddingCommentError: action.error
      }
    default: 
      return state;
  }
};

export default reducer;
