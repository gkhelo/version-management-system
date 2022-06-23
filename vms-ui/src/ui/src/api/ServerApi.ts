import { apiAxiosInstance, authAxiosInstance } from "../utils/AxiosInstance";
import {
  ADD_USER,
  AUTHENTICATED,
  DELETE_USER,
  GET_COMPANIES,
  GET_ROLES,
  GET_USER,
  GET_USERS,
  LOGIN,
  REGISTER,
  UPDATE_USER,
  GET_VENDORS,
  ADD_VENDOR,
  DELETE_VENDOR,
  GET_CLIENTS,
} from "../constants/Endpoints";
import { User } from "../types/User";
import { Pageable, PageImpl } from "../types/Pageable";
import { Company } from "../types/Company";

const login = async (data: FormData) => {
  return await authAxiosInstance.post(LOGIN, data);
};

const register = async (company: Company, admin: User) => {
  return await authAxiosInstance.post(REGISTER, {
    company: company,
    admin: admin,
  });
};

const getAuthenticatedUser = async (jwt: String) => {
  return await authAxiosInstance.get(AUTHENTICATED + "/" + jwt);
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

const addUser = async (user: User) => {
  const response = await apiAxiosInstance.post<User>(ADD_USER, user);
  return response.data;
};

const updateUser = async (user: User) => {
  const response = await apiAxiosInstance.put<User>(UPDATE_USER, user);
  return response.data;
};

const deleteUser = async (id: string | number) => {
  const response = await apiAxiosInstance.delete(`${DELETE_USER}/${id}`);
  return response.data;
};

const getRoles = async () => {
  const response = await apiAxiosInstance.get(GET_ROLES);
  return response.data;
};

const getCompanies = async () => {
  const response = await apiAxiosInstance.get<Company[]>(GET_COMPANIES);
  return response.data;
};

const getVendors = async () => {
  const response = await apiAxiosInstance.get<Company[]>(GET_VENDORS);
  return response.data;
}

const addVendor = async (vendorId: number) => {
  const response = await apiAxiosInstance.post(`${ADD_VENDOR}/${vendorId}`);
  return response.data;
};

const deleteVendor = async (id: string | number) => {
  const response = await apiAxiosInstance.delete(`${DELETE_VENDOR}/${id}`);
  return response.data;
};

const getClients = async () => {
  const response = await apiAxiosInstance.get<Company[]>(GET_CLIENTS);
  return response.data;
}

const ServerApi = {
  login,
  register,
  getAuthenticatedUser,
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getRoles,
  getCompanies,
  getVendors,
  addVendor,
  deleteVendor,
  getClients,
};

export default ServerApi;
