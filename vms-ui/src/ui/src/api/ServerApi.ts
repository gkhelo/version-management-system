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
  GET_APPLICATIONS,
  GET_APPLICATION,
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  GET_APPLICATION_USERS,
  SEARCH_USERS,
  ADD_APPLICATION_USER,
  DELETE_APPLICATION_USER,
} from "../constants/Endpoints";
import { User } from "../types/User";
import { Pageable, PageImpl } from "../types/Pageable";
import { Company } from "../types/Company";
import { Application } from "../types/Application";

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
};

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
};

const getApplications = async (pageable: Pageable) => {
  const response = await apiAxiosInstance.get<PageImpl<Application>>(
    GET_APPLICATIONS,
    {
      params: { ...pageable },
    }
  );
  return response.data;
};

const getApplication = async (id: string | number) => {
  const response = await apiAxiosInstance.get<Application>(
    `${GET_APPLICATION}/${id}`
  );
  return response.data;
};

const addApplication = async (application: Application) => {
  const response = await apiAxiosInstance.post<Application>(
    ADD_APPLICATION,
    application
  );
  return response.data;
};

const updateApplication = async (application: Application) => {
  const response = await apiAxiosInstance.put<Application>(
    UPDATE_APPLICATION,
    application
  );
  return response.data;
};

const getApplicationUsers = async (applicationId: number) => {
  const response = await apiAxiosInstance.get<User[]>(GET_APPLICATION_USERS, {
    params: { applicationId: applicationId },
  });
  return response.data;
};

const searchUsers = async (search: string, applicationId: number, maxResults: number) => {
  const response = await apiAxiosInstance.get<User[]>(SEARCH_USERS, {
    params: { search: search, applicationId: applicationId,  maxResults: maxResults },
  });
  return response.data;
};

const addApplicationUser = async (applicationId: number, userId: number) => {
  const response = await apiAxiosInstance.put<Application>(
    ADD_APPLICATION_USER,
    {},
    {
      params: { applicationId: applicationId, userId: userId },
    }
  );
  return response.data;
};

const deleteApplicationUser = async (applicationId: number, userId: number) => {
  const response = await apiAxiosInstance.put<Application>(
    DELETE_APPLICATION_USER,
    {},
    {
      params: { applicationId: applicationId, userId: userId },
    }
  );
  return response.data;
};

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
  getApplications,
  getApplication,
  addApplication,
  updateApplication,
  getApplicationUsers,
  searchUsers,
  addApplicationUser,
  deleteApplicationUser,
};

export default ServerApi;
