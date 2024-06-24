import Cookies from 'js-cookie';
import api from './index';

export const login = async (identifier, password, stillLoggedIn) => {
  try {
    const response = await api.post('/auth/login', { identifier, password });
    const expires = stillLoggedIn ? 3650 : 1 / 24;
    Cookies.set('token', response.data.token, { expires: expires });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgetPWD = async (email) => {
  try {
    const response = await api.post('/auth/forgetPWD', { email });
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const logout = async () => {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    throw error;
  }
};