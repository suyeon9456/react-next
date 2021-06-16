import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FOLLOW_ERROR, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOG_IN_ERROR, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_ERROR, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_ERROR, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_ERROR, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from '../reducers/user';

function loginAPI (data) {
  const result = axios.get('/api/login', data);
  return result.data;
}

function* login (action) {
  console.log('userSaga', action);
  try {
    // const data = yeild call(loginAPI, action.data);
    yield delay(2000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data
    });
  } catch (e) {
    yield put({
      type: LOG_IN_ERROR,
      error: e.response.data
    });
  }
}

function logoutAPI () {
  const result = axios.get('/api/logout');
  return result.data;
}

function* logout () {
  try {
    // const data = yeild call(logoutAPI);
    yield delay(2000);
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_ERROR,
      error: e.response.data
    });
  }
}

function signupAPI () {
  const result = axios.get('/api/signup');
  return result.data;
}

function* signup () {
  try {
    // const data = yeild call(signupAPI);
    yield delay(2000);
    yield put({
      type: SIGN_UP_SUCCESS
    });
  } catch (e) {
    yield put({
      type: SIGN_UP_ERROR,
      error: e.response.data
    });
  }
}

function followAPI () {
  const result = axios.get('/api/follow');
  return result.data;
}

function* follow () {
  try {
    // const data = yeild call(followAPI);
    yield delay(2000);
    yield put({
      type: FOLLOW_SUCCESS
    });
  } catch (e) {
    yield put({
      type: FOLLOW_ERROR,
      error: e.response.data
    });
  }
}

function unfollowAPI () {
  const result = axios.get('/api/unfollow');
  return result.data;
}

function* unfollow () {
  try {
    // const data = yeild call(unfollowAPI);
    yield delay(2000);
    yield put({
      type: UNFOLLOW_SUCCESS
    });
  } catch (e) {
    yield put({
      type: UNFOLLOW_ERROR,
      error: e.response.data
    });
  }
}

function* watchLogin () {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout () {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp () {
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchFollow () {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow () {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga () {
  yield all([
    yield fork(watchLogin),
    yield fork(watchLogout),
    yield fork(watchSignUp),
    yield fork(watchFollow),
    yield fork(watchUnFollow)
  ]);
}