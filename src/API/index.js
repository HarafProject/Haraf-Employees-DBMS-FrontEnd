import axios from 'axios';

const api = axios.create({
  baseURL: "http://127.0.0.1:5000",
  // baseURL: "https://haraf-edm.onrender.com",
  // baseURL:"https://desert-sand-jellyfish-garb.cyclic.app",
  headers: {
    "Content-Type": "application/json",
  },
});

const source = axios.CancelToken.source();
api.interceptors.request.use(
  config => {
    // Check if user is online
    // if (!navigator.onLine) {
    //   // Handle offline case, e.g., show an error message or retry later
    //   return Promise.reject(new Error('You are currently offline.'));
    // }

    // Get the JWT token from local storage
    const auth_token = localStorage.getItem("HARAF-AUTH") ? localStorage.getItem("HARAF-AUTH") : localStorage.getItem('persist:root')
      ? JSON.parse(JSON.parse(localStorage.getItem('persist:root')).auth)?.token
      : undefined;
      console.log(auth_token)

    if (auth_token) {
      config.headers['Authorization'] = `Bearer ${auth_token}`;
    }
    config.cancelToken = source.token;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const cancelRequest = (message) => {
  source.cancel(message);
};

export default api;
