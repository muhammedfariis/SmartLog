import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    if (response.data?.tokens?.accessToken) {
      localStorage.setItem("token", response.data.tokens.accessToken);

      console.log("token stored automatically successfull");
    }
    return response;
  },

  (error) => Promise.reject(error),
);

export default API;
