import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_COMMENT_ERROR, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_ERROR, ADD_POST_SUCCESS } from '../reducers/post';

function addPostAPI (data) {
  const result = axios.get('/api/post', data);
  return result.data;
}

function* addPost (action) {
  try {
    // const data = yeild call(addPostAPI, action.data);
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
      // data
    })
  } catch (e) {
    yield put({
      type: ADD_POST_ERROR,
      data: e.response.data
    });
  }
}

function addCommentAPI (data) {
  const result = axios.get('/api/Comment', data);
  return result.data;
}

function* addComment (action) {
  try {
    // const data = yeild call(addCommentAPI, action.data);
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data
    })
  } catch (e) {
    yield put({
      type: ADD_COMMENT_ERROR,
      data: e.response.data
    });
  }
}

function* watchAddPost () {
  // yield throttle('ADD_POST_REQUEST', addPost, 2000);
}

function* watchAddComment () {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga () {
  yield all([
    yield fork(watchAddPost),
    yield fork(watchAddComment)
  ]);
}
