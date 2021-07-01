import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { CHANGE_NICKNAME_ERROR, CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, FOLLOW_ERROR, FOLLOW_REQUEST, FOLLOW_SUCCESS, LOAD_MY_INFO_ERROR, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_ERROR, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_ERROR, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_ERROR, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, UNFOLLOW_ERROR, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS } from '../reducers/user';

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
  return axios.post('/api/logout');
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

function followAPI() {
  const result = axios.get('/api/follow');
  return result.data;
}

function* follow(action) {
  try {
    // const data = yeild call(followAPI);
    yield delay(2000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: FOLLOW_ERROR,
      error: e.response.data,
    });
  }
}

function unfollowAPI() {
  const result = axios.get('/api/unfollow');
  return result.data;
}

function* unfollow(action) {
  try {
    // const data = yeild call(unfollowAPI);
    yield delay(2000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (e) {
    yield put({
      type: UNFOLLOW_ERROR,
      error: e.response.data,
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

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
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
    yield fork(watchFollow),
    yield fork(watchUnFollow),
    yield fork(watchChangeNickname),
  ]);
}
