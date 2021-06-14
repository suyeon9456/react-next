import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI (data) {
  const result = axios.get('/api/login', data);
  return result.data;
}

function* login (action) {
  console.log('userSaga', action);
  try {
    // const data = yeild call(loginAPI, action.data);
    yield delay(2000);
    console.log('통과?')
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data
    });
  } catch (e) {
    yield put({
      type: 'LOG_IN_ERROR',
      data: e.response.data
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
      type: 'LOG_OUT_SUCCESS'
    });
  } catch (e) {
    yield put({
      type: 'LOG_OUT_ERROR',
      data: e.response.data
    });
  }
}

function* watchLogin () {
  yield takeLatest('LOG_IN_REQUEST', login);
}

function* watchLogout () {
  yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga () {
  yield all([
    yield fork(watchLogin),
    yield fork(watchLogout)
  ]);
}
