import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";
import { User } from "../types/User";

const useUsers = () => {
  const users = useQuery<User[], Error>("query-users", async () => {
    return await ServerApi.getUsers();
  });

  return users;
};

export default useUsers;
