import axios from "axios";

const baseURL = "https://haraf-edm.onrender.com";
// const baseURL = "http://localhost:5000";
// Create an Axios instance with the base URL
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