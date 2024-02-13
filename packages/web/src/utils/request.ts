import axios from 'axios';

const baseUrl = import.meta.env.VITE_APP_BASE_API;

const TIMEOUT = 60000;

console.log(baseUrl);

const instance = axios.create({
  baseURL: baseUrl,
  timeout: TIMEOUT,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
