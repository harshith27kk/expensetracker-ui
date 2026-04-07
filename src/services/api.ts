import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT, TOKEN_KEY } from '../utils/constants';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Generic API methods
export const apiCall = {
  get: <T,>(url: string, config = {}) =>
    axiosInstance.get<T>(url, config),

  post: <T,>(url: string, data: unknown, config = {}) =>
    axiosInstance.post<T>(url, data, config),

  put: <T,>(url: string, data: unknown, config = {}) =>
    axiosInstance.put<T>(url, data, config),

  delete: <T,>(url: string, config = {}) =>
    axiosInstance.delete<T>(url, config),
};

