import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: "16cd2860aeac110b198898133699b277",
  };
  return config;
});
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
