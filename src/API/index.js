import axios from "axios";
import { useSelector } from 'react-redux';

const baseURL = "https://haraf-edm.onrender.com";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: `${baseURL}`,
});

const CustomAxios = () => {
  // Use useSelector to get the JWT token from the Redux store
  const jwt = useSelector((state) => state.user.user.token);

  // Add an interceptor to include JWT in request headers if available
  api.interceptors.request.use(
    (config) => {
      if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Rest of your code...

  return null; // Since it's not a rendering component, you can return null or any other JSX element
};

export default api;
