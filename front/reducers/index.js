import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// const rootReducer = combineReducers({
//   index: (state = {}, action) => {
//     switch (action.type) {
//       case HYDRATE:
//         console.log('HYDRATE', HYDRATE);
//         return { ...state, ...action.payload }; // 6강에서 설명 예정
//       default:
//         return state;
//     }
//   },
//   user,
//   post,
// });

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      console.log('HYDRATE', HYDRATE);
      // console.log('payload', action.payload);
      return action.payload;
    default: {
      const combineReducer = combineReducers({ user, post });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
