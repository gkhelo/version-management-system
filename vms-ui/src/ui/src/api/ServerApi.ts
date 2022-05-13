import { axiosInstance } from "../utils/AxiosInstance";
import { LOGIN } from "../constants/Endpoints";

const login = async (data: FormData) => {
  return await axiosInstance.post(LOGIN, data);
};

const ServerApi = {
  login
};

export default ServerApi;
