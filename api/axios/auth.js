import Cookies from 'js-cookie';
import api from './index';

export const login = async (identifier, password) => {
  try {
    const response = await api.post('/auth/login', { identifier, password });
    Cookies.set('token', response.data.token, { expires: 30 });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await api.post('/auth/register',  data );
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