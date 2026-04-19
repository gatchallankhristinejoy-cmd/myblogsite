// frontend/src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  // URL ng iyong live backend sa Render
  baseURL: 'https://thefolio-backend.onrender.com/api', 
  timeout: 10000,
  withCredentials: true, // Pinapayagan ang cookies/sessions kung kailangan
});

/**
 * Request Interceptor
 * Tumatakbo bago ipadala ang bawat request sa server.
 * Dito natin inilalagay ang JWT token sa headers para sa authentication.
 */
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Log para sa debugging (makikita sa Browser Console)
  console.log('🔍 Axios request to:', config.url);
  console.log('🔍 Token from localStorage:', token ? 'EXISTS (' + token.length + ' chars)' : 'MISSING');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Authorization header set:', config.headers.Authorization.substring(0, 20) + '...');
  } else {
    console.log('❌ No token found, request might fail if route is protected');
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * Response Interceptor
 * Tumatakbo pagkatapos makatanggap ng response mula sa server.
 * Nakakatulong sa pag-handle ng global errors (halimbawa: 401 Unauthorized).
 */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios error details:', error.response || error.message);
    
  
    if (error.response && error.response.status === 401) {
      console.warn('⚠️ Token expired or invalid. Redirecting to login...');
      // localStorage.removeItem('token'); // Optional: Burahin ang invalid token
    }
    
    return Promise.reject(error);
  }
);

export default instance;