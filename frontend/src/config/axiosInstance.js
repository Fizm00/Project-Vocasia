import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer c1e292bc14d90d7d576083160d4ee3d51bc892f7610d3ad7930416c81290aaada05a5efcef52c8e0ad56d5b4118cae6fe3ec82b22f522896ba876f92c9debdceac709bea524532037ef9d8e1d7384764511c9eb4135798ebf5e1ad15526b459e28da6cd0cd259db4b3e694edeac5ce78a8fa34235b9ee01cda6c3b1862051e2145d65b66737c152ea7fabe0dd7b6ad26196e27faae0feaa07a7b20e500665c9d72179f0eb8b7ee5e2d8e778a35f59914d50be52b23401435449f2b0c22f5f021450220474fec2a1b48e8394733a200e53bf3c76848b5ad3f1e88594e7fb822a64e827bd8c3d2ec0064c686af10f0be8f4ce42325095ef8bbf617c42f5e106f85",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    console.error(
      "Error:",
      error,
      +"Unauthorized : Token Might be Expired or Invalid"
    );

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return Promise.reject(error);
  }
);
export default axiosInstance;
