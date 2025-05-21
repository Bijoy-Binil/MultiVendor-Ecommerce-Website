import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL
});

// Add a request interceptor to include JWT token in API requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If the error is due to an expired token and we haven't already tried to refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${baseURL}/token/refresh/`, {
          refresh: refreshToken
        });
        
        // Store the new token
        localStorage.setItem('access_token', response.data.access);
        
        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return axios(originalRequest);
      } catch (err) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('customer_login');
        window.location.href = '/customer/login';
        return Promise.reject(error);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api; 