import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  timeout: 1000,
});

// Add a request interceptor
api.interceptors.request.use((config) => {
  // Get the token from cookies
  const token = Cookies.get('token');

  // If the token exists, set it in the headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

export default api;