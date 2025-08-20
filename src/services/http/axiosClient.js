import axios from 'axios';
import { RequestHandler } from './requestHandler';
import { ErrorHandler } from './errorHandler';
import { API_BASE_URL } from '../ApiConstants';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    console.log(`📞 ${config.method?.toUpperCase()} ${config.url}`);
    return await RequestHandler.addAuthHeader(config);
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.url}`);
    return RequestHandler.handleResponse(response);
  },
  (error) => ErrorHandler.handleError(error)
);

export default axiosClient;