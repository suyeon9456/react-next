import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { CHANGE_NICKNAME_ERROR, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, FOLLOW_ERROR, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOAD_FOLLOWERS_ERROR, LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWERS_SUCCESS, LOAD_FOLLOWINGS_ERROR, LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWINGS_SUCCESS, LOAD_MY_INFO_ERROR, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_ERROR, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_ERROR, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, REMOVE_FOLLOWER_ERROR, REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, SIGN_UP_ERROR, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_ERROR, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from '../reducers/user';

function loadMyInfoAPI(data) {
  const result = axios.get('/user', data);
  return result;
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI, action.data);
    // yield delay(2000);
    console.log('result', result);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOAD_MY_INFO_ERROR,
      error: e.response.data,
    });
  }
}

function loginAPI(data) {
  return axios.post('/user/login', data);
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    // yield delay(2000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    yield put({
      type: LOG_IN_ERROR,
      error: e.response.data,
    });
  }
}

function logoutAPI() {
  return axios.post('/user/logout');
}

function* logout() {
  try {
    const result = yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: LOG_OUT_ERROR,
      error: e.response.data,
    });
  }
}

function signupAPI(data) {
  const result = axios.post('/user', data);
  return result;
}

function* signup(action) {
  try {
    const res = yield call(signupAPI, action.data);
    // yield delay(2000);
    console.log(res);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_ERROR,
      error: e.response.data,
    });
  }
}

function loadFollowingsAPI() {
  return axios.get('/user/followings');
}

function* loadFollowings() {
  try {
    const result = yield call(loadFollowingsAPI);
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FOLLOWINGS_ERROR,
      error: error.response.data,
    });
  }
}

function loadFollowersAPI() {
  return axios.get('/user/followers');
}

function* loadFollowers() {
  try {
    const result = yield call(loadFollowersAPI);
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FOLLOWERS_ERROR,
      error: error.response.data,
    });
  }
}

function followAPI(data) {
  return axios.patch(`/user/follow/${data}`);
}

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    // yield delay(2000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: FOLLOW_ERROR,
      error: e.response.data,
    });
  }
}

function unfollowAPI(data) {
  return axios.delete(`/user/unfollow/${data}`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: UNFOLLOW_ERROR,
      error: e.response.data,
    });
  }
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/follower/${data}`);
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_FOLLOWER_ERROR,
      error: error.response.data,
    });
  }
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', data);
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: CHANGE_NICKNAME_ERROR,
      error: e.response.data,
    });
  }
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    yield fork(watchLoadMyInfo),
    yield fork(watchLogin),
    yield fork(watchLogout),
    yield fork(watchSignUp),
    yield fork(watchLoadFollowings),
    yield fork(watchLoadFollowers),
    yield fork(watchFollow),
    yield fork(watchUnFollow),
    yield fork(watchRemoveFollower),
    yield fork(watchChangeNickname),
  ]);
}
