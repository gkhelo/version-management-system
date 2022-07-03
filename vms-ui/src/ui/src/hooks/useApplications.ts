import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";
import { Application } from "../types/Application";
import { Pageable, PageImpl } from "../types/Pageable";

const useApplications = (pageable: Pageable) => {
  return useQuery<PageImpl<Application>, Error>(
    ["query-applications", pageable],
    async () => {
      return await ServerApi.getApplications(pageable);
    },
  );
};

export default useApplications;