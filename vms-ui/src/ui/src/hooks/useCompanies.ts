import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";
import { Company } from "../types/Company";

const useCompanies = () => {
  return useQuery<Company[], Error>(["query-companies"], async () => {
    return await ServerApi.getCompanies();
  });
};

export default useCompanies;
