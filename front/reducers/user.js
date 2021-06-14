const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  me: null,
  signUpData: {},
  loginData: {}
};

export const loginAction = (data) => {
  return {
    type: 'LOG_IN_REQUEST',
    data
  }
};

export const logoutAction = () => {
  return {
    type: 'LOG_OUT_REQUEST'
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN_REQUEST':
      return {
        ...state,
        isLoggingIn: true
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: action.data.nickname }
      };
    case 'LOG_IN_ERROR':
      return {
        ...state,
        error: action.data
      };
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        isLoggingOut: true
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false,
        isLoggingOut: false,
        me: null
      };
    case 'LOG_OUT_ERROR':
      return {
        ...state,
        error: action.data
      };
    default: 
      return state;
  }
};

export default reducer;