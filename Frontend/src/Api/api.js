import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("token in localStorage:", localStorage.getItem("token"));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => {
    if (response.data?.tokens?.accessToken) {
      localStorage.setItem("token", response.data.tokens.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user))
    }
    return response;
  },

  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);


export default API;
