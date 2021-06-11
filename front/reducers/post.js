const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초'
    },
    content: '첫 번째 게시글',
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

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST
};

const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = (data) => {
  return {
    type: ADD_COMMENT,
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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true
      }
    case ADD_COMMENT:
      return {
        ...state,
        mainPosts: state.mainPosts.map((post) => {
          return post.id === action.data.postId
            ? {
                ...post,
                Comments: [...post.Comments, { User: { nickname: action.data.id }, content: action.data.comment }]
              }
            : post
        })
      }
    default: 
      return state;
  }
};

export default reducer;