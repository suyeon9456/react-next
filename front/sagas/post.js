import { all, delay, fork, put, throttle } from 'redux-saga/effects';
import axios from 'axios';

function addPostAPI (data) {
  const result = axios.get('/api/post', data);
  return result.data;
}

function* addPost (action) {
  try {
    // const data = yeild call(addPostAPI, action.data);
    yield delay(2000);
    yield put({
      type: 'ADD_POST_SUCCESS',
      // data
    })
  } catch (e) {
    yield put({
      type: 'ADD_POST_ERROR',
      data: e.response.data
    });
  }
}

function* watchAddPost () {
  // yield throttle('ADD_POST_REQUEST', addPost, 2000);
}

export default function* postSaga () {
  yield all([
    yield fork(watchAddPost)
  ]);
}
