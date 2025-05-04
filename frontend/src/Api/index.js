import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4001/api",
});

const getToken = () => {
  return localStorage.getItem("authToken");
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
