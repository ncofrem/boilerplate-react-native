import { call, put, race, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import jwt from 'jwt-decode';
import API_CONFIG from '../config/configurations';
import { authTypes } from '../actions/auth';

const { globalTimeout, timeoutMessage } = API_CONFIG;

function* setUserHeaders(headers) {
  try {
    const authorization = headers.get('Authorization').split('Bearer ')[1];
    if (authorization) {
      AsyncStorage.setItem('jwt', authorization);
      yield put({
        type: authTypes.SET_INFO_USER,
        result: jwt(authorization)
      });
    }
  } catch (error) {
    //
  }
}

function* runDefaultSaga(callRequest, successCallback, failureCallback) {
  const requestInfo = {
    timeout: false,
    response: null
  };
  try {
    const { response, timeout } = yield race({
      response: call(callRequest.request, callRequest.params),
      timeout: delay(globalTimeout)
    });

    if (timeout) {
      requestInfo.timeout = true;
      throw new Error(timeoutMessage);
    }

    requestInfo.response = response;

    if (response.ok) {
      const result =
        response.status === 204 ? { success: true } : yield response.json();
      yield setUserHeaders(response.headers);
      yield successCallback(result, response, callRequest.params);
    } else if (response.status === 401) {
      throw new Error(
        response.message || 'Ocurrió un problema en la autenticación'
      );
    } else if (response.status === 403) {
      throw new Error(
        response.message || 'Necesitas autorización para realizar esta acción'
      );
    } else if (response.message) {
      throw new Error(response.message);
    } else {
      throw new Error('Hubo un problema. Vuelva a intentar.');
    }
  } catch (error) {
    yield failureCallback(error.toString(), callRequest.params, requestInfo);
  }
}

export default runDefaultSaga;
