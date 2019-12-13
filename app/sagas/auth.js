import { takeEvery, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { authTypes, signIn } from '../actions/auth';
import { noticeTypes } from '../actions/notice';
import runDefaultSaga from './default';
import API from '../services/api';

// SIGN IN
const signInRequest = params => API.post('/login', params);

function* signInSuccess(result, response) {
  if (result.errors) {
    throw new Error(result.errors.join('\n'));
  } else {
    yield put({ type: authTypes.SIGN_IN_SUCCESS, result, response });
  }
}

function* signInFailure(message) {
  yield put({
    type: noticeTypes.SET_NOTICE,
    title: 'Error',
    message,
    kind: 'error'
  });
  yield put({
    type: authTypes.SIGN_IN_FAILURE
  });
}

function* sagaSignIn(action) {
  yield runDefaultSaga(
    { request: signInRequest, params: { user: action.params } },
    signInSuccess,
    signInFailure
  );
}

// CREATE ACCOUNT
const signUpRequest = params => API.post('/signup', params);

function* signUpSuccess(result, response, params) {
  if (result.errors) {
    throw new Error(result.errors.join('\n'));
  } else {
    yield put({ type: authTypes.SIGN_UP_SUCCESS, result, response });
    const user = params;
    delete user.password_confirmation;
    yield put(signIn(user));
  }
}

function* signUpFailure() {
  yield put({
    type: authTypes.SIGN_UP_FAILURE
  });
}

function* sagaSignUp(action) {
  yield runDefaultSaga(
    { request: signUpRequest, params: action.params },
    signUpSuccess,
    signUpFailure
  );
}

// SIGN OUT
const signOutRequest = () => API.delete('/logout');

function* signOutSuccess(result) {
  if (result.success) {
    yield put({ type: authTypes.SIGN_OUT_SUCCESS });
  } else {
    throw new Error(result);
  }
}

function* signOutFailure() {
  yield put({ type: authTypes.SIGN_OUT_FAILURE });
}

function* sagaSignOut() {
  yield AsyncStorage.removeItem('jwt');
  yield runDefaultSaga(
    { request: signOutRequest },
    signOutSuccess,
    signOutFailure
  );
}

// RECOVER PASSWORD
const passwordRecoveryRequest = params => API.post('/password/forgot', params);

function* passwordRecoverySuccess(result) {
  if (result.errors) {
    throw new Error(result.errors.join('\n'));
  } else {
    yield put({
      type: noticeTypes.SET_NOTICE,
      message: result.message,
      kind: 'success'
    });
  }
  yield put({ type: authTypes.PASSWORD_RECOVERY_SUCCESS });
}

function* passwordRecoveryFailure(message) {
  yield put({
    type: noticeTypes.SET_NOTICE,
    title: 'Error',
    message,
    kind: 'error'
  });
  yield put({ type: authTypes.SIGN_OUT_FAILURE });
}

function* sagaPasswordRecovery(action) {
  yield runDefaultSaga(
    { request: passwordRecoveryRequest, params: action.params },
    passwordRecoverySuccess,
    passwordRecoveryFailure
  );
}

// DEFINE authSagas
export default function* authSagas() {
  yield takeEvery(authTypes.SIGN_IN_REQUEST, sagaSignIn);
  yield takeEvery(authTypes.SIGN_UP_REQUEST, sagaSignUp);
  yield takeEvery(authTypes.SIGN_OUT_REQUEST, sagaSignOut);
  yield takeEvery(authTypes.PASSWORD_RECOVERY_REQUEST, sagaPasswordRecovery);
}
