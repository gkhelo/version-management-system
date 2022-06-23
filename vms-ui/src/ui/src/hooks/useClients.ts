import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";
import { Company } from "../types/Company";

const useClients = () => {
  return useQuery<Company[], Error>(["query-clients"], async () => {
    return await ServerApi.getClients();
  });
};

export default useClients;
