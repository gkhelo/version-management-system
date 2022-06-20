import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";
import { Pageable, PageImpl } from "../types/Pageable";
import { User } from "../types/User";

const useUsers = (pageable: Pageable) => {
  return useQuery<PageImpl<User>, Error>(
    ["query-users", pageable],
    async () => {
      return await ServerApi.getUsers(pageable);
    },
  );
};

export default useUsers;
