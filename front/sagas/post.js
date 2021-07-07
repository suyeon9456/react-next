import { all, fork, put, takeLatest, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
// import shortId from 'shortid';
import { ADD_COMMENT_ERROR, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_ERROR, ADD_POST_REQUEST, ADD_POST_SUCCESS, LIKE_POST_ERROR, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LOAD_HASHTAG_POSTS_ERROR, LOAD_HASHTAG_POSTS_REQUEST, LOAD_HASHTAG_POSTS_SUCCESS, LOAD_POSTS_ERROR, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POST_ERROR, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_USER_POSTS_ERROR, LOAD_USER_POSTS_REQUEST, LOAD_USER_POSTS_SUCCESS, REMOVE_POST_ERROR, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, RETWEET_ERROR, RETWEET_REQUEST, RETWEET_SUCCESS, UNLIKE_POST_ERROR, UNLIKE_POST_REQUEST, UNLIKE_POST_SUCCESS, UPLOAD_IMAGES_ERROR, UPLOAD_IMAGES_REQUEST, UPLOAD_IMAGES_SUCCESS } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_TO_ME } from '../reducers/user';

function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`, data);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error('e: ', e);
    yield put({
      type: LIKE_POST_ERROR,
      error: e.response.data,
    });
  }
}

function unlikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unlikePost(action) {
  try {
    const result = yield call(unlikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error('e: ', e);
    yield put({
      type: UNLIKE_POST_ERROR,
      error: e.response.data,
    });
  }
}

function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.lastId);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      // data: dummyLoadPosts(10),
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_POSTS_ERROR,
      error: e.response.data,
    });
  }
}

function loadUserPostsAPI(data, lastId) {
  return axios.get(`/user/posts/${data}?lastId=${lastId || 0}`);
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_USER_POSTS_ERROR,
      error: e.response.data,
    });
  }
}

function loadHashtagPostsAPI(data, lastId) {
  return axios.get(`/hashtag/posts/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}

function* loadHashtagPosts(action) {
  try {
    const result = yield call(loadHashtagPostsAPI, action.data, action.lastId);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      // data: dummyLoadPosts(10),
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_HASHTAG_POSTS_ERROR,
      error: e.response.data,
    });
  }
}

function loadPostAPI(data) {
  return axios.get(`/post/${data}`);
}

function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.data);
    console.log('result.data', result.data);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_POST_ERROR,
      error: e.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post('/post', data);
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
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
  return axios.post(`/post/${data.postId}/comment`, data);
}

function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    // yield delay(2000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: ADD_COMMENT_ERROR,
      error: e.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_TO_ME,
      data: result.data.PostId,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_POST_ERROR,
      error: e.response.data,
    });
  }
}

function uploadImagesAPI(data) {
  return axios.post('/post/images', data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagesAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UPLOAD_IMAGES_ERROR,
      error: e.response.data,
    });
  }
}

function retweetAPI(data) {
  return axios.post(`/post/retweet/${data}`);
}

function* retweet(action) {
  try {
    const result = yield call(retweetAPI, action.data);
    yield put({
      type: RETWEET_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: RETWEET_ERROR,
      error: e.response.data,
    });
  }
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchLoadPosts() {
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchLoadUserPosts() {
  yield throttle(5000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
  yield throttle(5000, LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

function* watchLoadPost() {
  yield throttle(5000, LOAD_POST_REQUEST, loadPost);
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

function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

export default function* postSaga() {
  yield all([
    yield fork(watchLikePost),
    yield fork(watchUnlikePost),
    yield fork(watchLoadPosts),
    yield fork(watchLoadUserPosts),
    yield fork(watchLoadHashtagPosts),
    yield fork(watchLoadPost),
    yield fork(watchAddPost),
    yield fork(watchAddComment),
    yield fork(watchRemovePost),
    yield fork(watchUploadImages),
    yield fork(watchRetweet),
  ]);
}
