import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";

const useRoles = () => {
  return useQuery<string[], Error>(["query-roles"], async () => {
    return await ServerApi.getRoles();
  });
};

export default useRoles;
