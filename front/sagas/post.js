import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import shortId from 'shortid';
import { ADD_COMMENT_ERROR, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_ERROR, ADD_POST_REQUEST, ADD_POST_SUCCESS, REMOVE_POST_ERROR, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from '../reducers/user';

function addPostAPI(data) {
  const result = axios.get('/api/post', data);
  return result.data;
}

function* addPost(action) {
  try {
    // const data = yeild call(addPostAPI, action.data);
    const id = shortId.generate();
    yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_ERROR,
      error: e.response.data,
    });
  }
}

function addCommentAPI(data) {
  const result = axios.get('/api/Comment', data);
  return result.data;
}

function* addComment(action) {
  try {
    // const data = yeild call(addCommentAPI, action.data);
    yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: ADD_COMMENT_ERROR,
      error: e.response.data,
    });
  }
}

function removePostAPI(data) {
  const result = axios.delete('/api/post', data);
  return result.data;
}

function* removePost(action) {
  try {
    // const data = yeild call(removePostAPI, action.data);
    yield delay(2000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    console.log('action', action);
    yield put({
      type: REMOVE_POST_TO_ME,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: REMOVE_POST_ERROR,
      error: e.response.data,
    });
  }
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

export default function* postSaga() {
  yield all([
    yield fork(watchAddPost),
    yield fork(watchAddComment),
    yield fork(watchRemovePost),
  ]);
}
