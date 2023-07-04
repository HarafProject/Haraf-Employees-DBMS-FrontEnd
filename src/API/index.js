import axios from "axios";

const baseURL = "https://haraf-edm.onrender.com";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: `${baseURL}`,
});

// Add an interceptor to include JWT in request headers if available
api.interceptors.request.use(
  (config) => {
    const jwt = ""; // Replace getJWT() with the function to get the JWT from your storage or state

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
