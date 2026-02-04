import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // use .env
  withCredentials: true, // IMPORTANT for cookie auth
});

export default instance;