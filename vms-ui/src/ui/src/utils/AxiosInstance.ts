import axios from "axios";
import { API_URL_PREFIX, AUTH_URL_PREFIX } from "../constants/Endpoints";

export const authAxiosInstance = axios.create({
  baseURL: AUTH_URL_PREFIX,
});

export const apiAxiosInstance = axios.create({
  baseURL: API_URL_PREFIX,
});

apiAxiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("jwt");
  if (token && config.headers) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));
