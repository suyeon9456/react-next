const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingInError: null,
  isLoggingOut: false,
  isLoggedOut: false,
  isLoggingOutError: null,
  isSigningUp: false,
  isSignedUp: false,
  isSigningUError: null,
  isFollowing: false,
  isFollowed: false,
  isFollowingError: null,
  isUnFollowing: false,
  isUnFollowed: false,
  isUnFollowingError: null,
  me: null,
  signUpData: {},
  loginData: {}
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
  Followers: []
})

export const loginAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data
  }
};

export const logoutAction = () => {
  return {
    type: LOG_OUT_REQUEST
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isLoggedIn: false,
        isLoggingError: null
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: dummyUser(action.data)
      };
    case LOG_IN_ERROR:
      return {
        ...state,
        isLoggingError: action.error
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        isLoggedOut: false,
        isLoggingError: null
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        isLoggingOut: false,
        isLoggedOut: true,
        me: null
      };
    case LOG_OUT_ERROR:
      return {
        ...state,
        isLoggingOut: false,
        isLoggingError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isSigningUp: true,
        isSignedUp: false,
        isSigningUError: null
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isSigningUp: false,
        isSignedUp: true
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        isSigningUp: false,
        isSigningUError: action.error
      };
    case FOLLOW_REQUEST:
      return {
        ...state,
        isFollowing: true,
        isFollowed: false,
        isFollowingError: null
      };
    case FOLLOW_SUCCESS:
      return {
        ...state,
        isFollowed: true,
        isFollowing: false
      };
    case FOLLOW_ERROR:
      return {
        ...state,
        isFollowing: false,
        isFollowingError: action.error
      };
    case UNFOLLOW_REQUEST:
      return {
        ...state,
        isUnFollowing: true,
        isUnFollowed: false,
        isUnFollowingError: null
      };
    case UNFOLLOW_SUCCESS:
      return {
        ...state,
        isUnFollowing: false,
        isUnFollowed: true
      };
    case UNFOLLOW_ERROR:
      return {
        ...state,
        isUnFollowing: false,
        isUnFollowingError: action.error
      };
    default: 
      return state;
  }
};

export default reducer;