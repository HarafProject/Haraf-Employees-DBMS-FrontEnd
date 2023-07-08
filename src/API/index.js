import axios from "axios";

const baseURL = "https://haraf-edm.onrender.com";

const api = axios.create({
  baseURL,
  withCredentials: true,
});


// Get the JWT token from local storage
const jwt = localStorage.getItem('persist:root')
  ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).user
  : undefined;

if (jwt) {
  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${jwt}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
}

export default api;
