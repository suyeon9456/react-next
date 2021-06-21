import produce from 'immer';

const initialState = {
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  changeNicknameLoading: false,
  changeNicknameDone: false,
  changeNicknameError: null,
  followLoading: false,
  followDone: false,
  followError: null,
  unfollowLoading: false,
  unfollowDone: false,
  unfollowError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_ERROR = 'CHANGE_NICKNAME_ERROR';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_ERROR = 'FOLLOW_ERROR';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_ERROR = 'UNFOLLOW_ERROR';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';

const dummyUser = (data) => ({
  ...data,
  nickname: 'suyeon',
  id: data.id,
  Posts: [{ id: 1 }],
  Followings: [{ nickname: 'suyeon' }, { nickname: 'jaewook' }, { nickname: 'yogi' }],
  Followers: [{ nickname: 'suyeon' }, { nickname: 'jaewook' }, { nickname: 'yogi' }],
});

export const loginAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => (produce(state, (draft) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      draft.loginLoading = true;
      draft.loginDone = false;
      draft.loginError = null;
      break;
    case LOG_IN_SUCCESS:
      draft.loginLoading = false;
      draft.loginDone = true;
      draft.me = dummyUser(action.data);
      break;
    case LOG_IN_ERROR:
      draft.loginError = action.error;
      break;
    case LOG_OUT_REQUEST:
      draft.logOutLoading = true;
      draft.logOutDone = false;
      draft.logOutError = null;
      break;
    case LOG_OUT_SUCCESS:
      draft.loginDone = false;
      draft.logOutLoading = false;
      draft.logoutDone = true;
      break;
    case LOG_OUT_ERROR:
      draft.logOutLoading = false;
      draft.logOutError = action.error;
      break;
    case SIGN_UP_REQUEST:
      draft.signupLoading = true;
      draft.signupDone = false;
      draft.signupError = null;
      break;
    case SIGN_UP_SUCCESS:
      draft.signupLoading = false;
      draft.signupDone = true;
      break;
    case SIGN_UP_ERROR:
      draft.signupLoading = false;
      draft.signupError = action.error;
      break;
    case CHANGE_NICKNAME_REQUEST:
      draft.changeNicknameLoading = true;
      draft.changeNicknameDone = false;
      draft.changeNicknameError = null;
      break;
    case CHANGE_NICKNAME_SUCCESS:
      draft.changeNicknameLoading = false;
      draft.changeNicknameDone = true;
      break;
    case CHANGE_NICKNAME_ERROR:
      draft.changeNicknameLoading = false;
      draft.changeNicknameError = action.error;
      break;
    case FOLLOW_REQUEST:
      draft.followLoading = true;
      draft.followDone = false;
      draft.followError = null;
      break;
    case FOLLOW_SUCCESS:
      draft.followLoading = false;
      draft.followDone = true;
      draft.me.Followings.push({ id: action.data });
      break;
    case FOLLOW_ERROR:
      draft.followLoading = false;
      draft.followError = action.error;
      break;
    case UNFOLLOW_REQUEST:
      draft.unfollowLoading = true;
      draft.unfollowDone = false;
      draft.unfollowError = null;
      break;
    case UNFOLLOW_SUCCESS:
      draft.unfollowLoading = false;
      draft.unfollowDone = true;
      draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
      break;
    case UNFOLLOW_ERROR:
      draft.unfollowLoading = false;
      draft.unfollowError = action.error;
      break;
    case ADD_POST_TO_ME:
      draft.me.Posts = draft.me.Posts.unshift({ id: action.data });
      break;
    case REMOVE_POST_TO_ME:
      draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
      break;
    default:
      break;
  }
}));

export default reducer;
