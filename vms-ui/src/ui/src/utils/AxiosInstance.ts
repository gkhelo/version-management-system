import axios from "axios";
import { API_URL_PREFIX } from "../constants/Endpoints";

export const axiosInstance = axios.create({
  baseURL: API_URL_PREFIX,
});
