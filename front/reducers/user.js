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

const dummyUser = (data) => ({
  ...data,
  nickname: 'suyeon',
  id: 2,
  Posts: [],
  Followings: [],
  Followers: [],
});

export const loginAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN_ERROR:
      return {
        ...state,
        loginError: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
        logOutDone: false,
        logOutError: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        loginDone: false,
        logOutLoading: false,
        logoutDone: true,
        me: null,
      };
    case LOG_OUT_ERROR:
      return {
        ...state,
        logOutLoading: false,
        logOutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupDone: true,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        signupLoading: false,
        signupError: action.error,
      };
    case CHANGE_NICKNAME_REQUEST:
      return {
        ...state,
        changeNicknameLoading: true,
        changeNicknameDone: false,
        changeNicknameError: null,
      };
    case CHANGE_NICKNAME_SUCCESS:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameDone: true,
      };
    case CHANGE_NICKNAME_ERROR:
      return {
        ...state,
        changeNicknameLoading: false,
        changeNicknameError: action.error,
      };
    case FOLLOW_REQUEST:
      return {
        ...state,
        followLoading: true,
        followDone: false,
        followError: null,
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        followLoading: false,
        followDone: true,
      };
    case FOLLOW_ERROR:
      return {
        ...state,
        followLoading: false,
        followError: action.error,
      };
    case UNFOLLOW_REQUEST:
      return {
        ...state,
        unfollowLoading: true,
        unfollowDone: false,
        unfollowError: null,
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        unfollowLoading: false,
        unfollowDone: true,
      };
    case UNFOLLOW_ERROR:
      return {
        ...state,
        unfollowLoading: false,
        unfollowError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
