import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://54.92.130.37:8080',
  headers: {"ngrok-skip-browser-warning":"true"}
});

//intercept the requests to add the JWT to the header
api.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token'); // Assuming the JWT is stored in localStorage
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
        console.log(error)
      return Promise.reject(error);
    }
  );


//intercept the forbidden response then refresh the token and try the request again
api.interceptors.response.use(response => response, async error => {
    const originalRequest = error.config;
    

    if (error.response.status === 401 && !originalRequest._retry) {

      originalRequest._retry = true;
      try {

        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/api/v1/auth/refresh', { token: refreshToken });
        const token = response.data.token;

        localStorage.setItem('token', token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);


      } catch (refreshError) {

        localStorage.clear();
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  });
  

export default api