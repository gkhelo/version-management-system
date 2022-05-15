import { apiAxiosInstance, authAxiosInstance } from "../utils/AxiosInstance";
import { GET_USERS, LOGIN } from "../constants/Endpoints";
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

const ServerApi = {
  login,
  getUsers,
};

export default ServerApi;
