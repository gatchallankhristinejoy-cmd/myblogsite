import axios from 'axios';

const instance = axios.create({
  // URL ng iyong live backend sa Render
  baseURL: 'https://myblogsite-cov8.onrender.com/api', 
  timeout: 10000,
  withCredentials: true, 
}); // <--- ITO YUNG NAWALA KANINA KAYA NAG-ERROR

/**
 * Request Interceptor
 */
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Response Interceptor
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error details:', error.response || error.message);
    
    if (error.response && error.response.status === 401) {
      console.warn('⚠️ Token expired or invalid.');
    }
    
    return Promise.reject(error);
  }
);

export default instance;