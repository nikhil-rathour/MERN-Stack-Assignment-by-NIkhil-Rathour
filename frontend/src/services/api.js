import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_DEPLOYED_BACKEND_URL,
});

API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) req.headers.Authorization = token;
    return req;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default API;
