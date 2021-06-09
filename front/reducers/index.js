import { HYDRATE } from 'next-redux-wrapper'

const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {}
  },
  post: {
    mainPosts: []
  }
};

export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data
  }
}

export const logoutAction = () => {
  return {
    type: 'LOG_OUT'
  }
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', HYDRATE);
      return { ...state, ...action.payload }; // 6강에서 설명 예정
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data
        }
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null
        }
      };
    default: 
      return state;
  }
};

export default rootReducer;
