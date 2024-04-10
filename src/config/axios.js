import axios from "axios";
import { store } from "../store/store";

console.log("BACKEND_URL: " + import.meta.env.VITE_API_URL);
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.interceptors.request.use(
  (config) => {
    const token = store.getState().token; // ดึง token โดยตรงจาก Redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response.status === 401) {
//       removeAccessToken();
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;
