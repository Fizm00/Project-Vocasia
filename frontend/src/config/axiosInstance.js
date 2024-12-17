import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api-anakkost.vocasia-fsjs-c.fun/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const user = localStorage.getItem("user");
    if (user) {
      config.headers.user = user;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: Token might be expired or invalid.");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // Redirect ke halaman login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
