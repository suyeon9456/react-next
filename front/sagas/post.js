import { all, delay, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import shortId from 'shortid';
import { ADD_COMMENT_ERROR, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_ERROR, ADD_POST_REQUEST, ADD_POST_SUCCESS, dummyLoadPosts, LOAD_POSTS_ERROR, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, REMOVE_POST_ERROR, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from '../reducers/user';

function loadPostsAPI(data) {
  const result = axios.get('/api/posts', data);
  return result.data;
}

function* loadPosts() {
  try {
    // const data = yeild call(loadPostsAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: dummyLoadPosts(10),
    });
  } catch (e) {
    yield put({
      type: LOAD_POSTS_ERROR,
      error: e.response.data,
    });
  }
}

function addPostAPI(data) {
  console.log('content:', data);
  const result = axios.post('/post', data);
  return result;
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    console.log(result);
    // const id = shortId.generate();
    // yield delay(2000);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (e) {
    yield put({
      type: ADD_POST_ERROR,
      error: e.response.data,
    });
  }
}

function addCommentAPI(data) {
  const result = axios.post(`/post/${data.postId}/comment`, data);
  return result.data;
}

function* addComment(action) {
  try {
    const data = yield call(addCommentAPI, action.data);
    console.log(data);
    // yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data,
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

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
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
    yield fork(watchLoadPosts),
    yield fork(watchAddPost),
    yield fork(watchAddComment),
    yield fork(watchRemovePost),
  ]);
}
