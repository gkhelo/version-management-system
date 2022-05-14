import { axiosInstance } from "../utils/AxiosInstance";
import { GET_USERS, LOGIN } from "../constants/Endpoints";
import { User } from "../types/User";

const login = async (data: FormData) => {
  return await axiosInstance.post(LOGIN, data);
};

const getUsers = async () => {
  const response = await axiosInstance.get<User[]>(GET_USERS);
  return response.data;
};

const ServerApi = {
  login,
  getUsers
};

export default ServerApi;
