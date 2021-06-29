import shortId from 'shortid';
import produce from 'immer';
import faker from 'faker';

const initialState = {
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  mainPosts: [],
  imagePaths: [],
  postAdded: false,
  hasMorePosts: true,
};

export const dummyLoadPosts = (number) => (Array(number).fill().map(() => ({
  id: shortId.generate(),
  User: {
    id: shortId.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image(),
  }],
  Comments: [{
    User: {
      nickname: faker.name.findName(),
    },
    content: faker.lorem.sentence(),
  }],
})));

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_ERROR = 'LOAD_POSTS_ERROR';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_ERROR = 'ADD_POST_ERROR';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_ERROR = 'ADD_COMMENT_ERROR';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_ERROR = 'REMOVE_POST_ERROR';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

export const removePost = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

// const dummyPost = (data) => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: 'aa@gmacil.com',
//     nickname: 'suyeon',
//   },
//   Images: [],
//   Comments: [],
// });

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data.comment,
  User: {
    id: data.id,
    nickname: 'suyeon',
  },
});

const reducer = (state = initialState, action) => (produce(state, (draft) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      draft.loadPostsLoading = true;
      draft.loadPostsDone = false;
      draft.loadPostsError = null;
      break;
    case LOAD_POSTS_SUCCESS:
      draft.loadPostsLoading = false;
      draft.loadPostsDone = true;
      draft.mainPosts = action.data.concat(draft.mainPosts);
      draft.hasMorePosts = draft.mainPosts.length < 50;
      break;
    case LOAD_POSTS_ERROR:
      draft.loadPostsLoading = false;
      draft.loadPostsError = action.error;
      break;
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(action.data);
      break;
    case ADD_POST_ERROR:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.push(dummyComment(action.data));
      break;
    }
    case ADD_COMMENT_ERROR:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;
    case REMOVE_POST_ERROR:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    default:
      break;
  }
}));

export default reducer;
