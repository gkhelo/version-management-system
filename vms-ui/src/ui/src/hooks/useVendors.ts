import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";
import { Company } from "../types/Company";

const useVendors = () => {
  return useQuery<Company[], Error>(["query-vendors"], async () => {
    return await ServerApi.getVendors();
  });
};

export default useVendors;
