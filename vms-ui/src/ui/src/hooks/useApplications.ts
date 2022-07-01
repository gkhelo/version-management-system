import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";
import { Application } from "../types/Application";

const useApplications = () => {
  return useQuery<Application[], Error>(["query-applications"], async () => {
    return await ServerApi.getApplications();
  });
};

export default useApplications;
