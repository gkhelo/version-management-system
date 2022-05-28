import { apiAxiosInstance, authAxiosInstance } from "../utils/AxiosInstance";
import { GET_USERS, LOGIN, REGISTER } from "../constants/Endpoints";
import { User } from "../types/User";
import { Pageable, PageImpl } from "../types/Pageable";
import { Company } from "../types/Company";

const login = async (data: FormData) => {
  return await authAxiosInstance.post(LOGIN, data);
};

const register = async (company: Company, admin: User) => {
  return await authAxiosInstance.post(REGISTER, {
    "company": company,
    "admin": admin
  });
};

const getUsers = async (pageable: Pageable) => {
  const response = await apiAxiosInstance.get<PageImpl<User>>(GET_USERS, {
    params: { ...pageable },
  });
  return response.data;
};

const ServerApi = {
  login,
  register,
  getUsers,
};

export default ServerApi;
