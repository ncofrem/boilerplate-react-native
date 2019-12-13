import AsyncStorage from '@react-native-community/async-storage';
import snakeCaseKeys from 'snakecase-keys';
import API_CONFIG from '../config/configurations';

const { url } = API_CONFIG;

const headers = async () => {
  const jwt = await AsyncStorage.getItem('jwt');
  if (jwt) {
    return new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`
    });
  }
  return new Headers({
    'Content-Type': 'application/json'
  });
};

export default class API {
  static genericErrorMessage(status) {
    return status === 404 ? 'Recurso no encontrado' : 'Intentelo más tarde';
  }

  static get = async route => {
    const _headers = await headers();
    return fetch(url() + route, {
      method: 'GET',
      headers: _headers
    });
  };

  static post = async (route, params = {}) => {
    const _headers = await headers();
    return fetch(url() + route, {
      mode: 'cors',
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(snakeCaseKeys(params)),
      headers: _headers
    });
  };

  static put = async (route, params = {}) => {
    const _headers = await headers();
    return fetch(url() + route, {
      mode: 'cors',
      method: 'PUT',
      cache: 'no-cache',
      body: JSON.stringify(snakeCaseKeys(params)),
      headers: _headers
    });
  };

  static delete = async (route, params = {}) => {
    const _headers = await headers();
    return fetch(url() + route, {
      method: 'DELETE',
      body: JSON.stringify(snakeCaseKeys(params)),
      headers: _headers
    });
  };
}
