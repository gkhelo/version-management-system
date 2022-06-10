import { apiAxiosInstance, authAxiosInstance } from "../utils/AxiosInstance";
import {
  DELETE_USER,
  GET_USER,
  GET_USERS,
  LOGIN,
  SAVE_USER,
} from "../constants/Endpoints";
import { User } from "../types/User";
import { Pageable, PageImpl } from "../types/Pageable";

const login = async (data: FormData) => {
  return await authAxiosInstance.post(LOGIN, data);
};

const getUsers = async (pageable: Pageable) => {
  const response = await apiAxiosInstance.get<PageImpl<User>>(GET_USERS, {
    params: { ...pageable },
  });
  return response.data;
};

const getUser = async (id: string | number) => {
  const response = await apiAxiosInstance.get<User>(`${GET_USER}/${id}`);
  return response.data;
};

const saveUser = async (user: User) => {
  const response = await apiAxiosInstance.post<User>(SAVE_USER, user);
  return response.data;
};

const deleteUser = async (id: string | number) => {
  const response = await apiAxiosInstance.delete(`${DELETE_USER}/${id}`);
  return response.data;
};

const ServerApi = {
  login,
  getUsers,
  getUser,
  saveUser,
  deleteUser,
};

export default ServerApi;
