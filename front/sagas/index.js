import { all, call, delay, put, take, takeLatest, throttle } from 'redux-saga/effects';

function loginAPI (data) {
  const result = axios.get('/api/login', data);
  return result.data;
}

function* login (action) {
  try {
    // const data = yeild call(loginAPI, action.data);
    delay(2000);
    yeild put({
      type: 'LOGIN_SUCCESS',
      // data
    });
  } catch (e) {
    yeild put({
      type: 'LOGIN_ERROR',
      data: err.response.data
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
    delay(2000);
    yeild put({
      type: 'LOGOUT_SUCCESS',
      // data
    });
  } catch (e) {
    yeild put({
      type: 'LOGOUT_ERROR',
      data: err.response.data
    });
  }
  
  function addPostAPI (data) {
    const result = axios.get('/api/post', data);
    return result.data;
  }

function* addPost (action) {
  try {
    // const data = yeild call(addPostAPI, action.data);
    delay(2000);
    yeild put({
      type: 'ADD_POST_SUCCESS',
      // data
    })
  } catch (e) {
    yeild put({
      type: 'ADD_POST_ERROR',
      data: err.response.data
    });
  }
}

function* watchLogin() {
  yeild takeLatest('LOGIN_REQUEST', login);
}

function* watchLogout() {
  yeild takeLatest('LOGOUT_REQUEST', logout);
}

function* watchAddPost() {
  yeild throttle('ADD_POST_REQUEST', addPost, 2000);
}

export default function* rootSaga () {
  yeild all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchAddPost)
  ]);
}
