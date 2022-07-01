import { useQuery } from "react-query";
import ServerApi from "../api/ServerApi";
import { Pageable, PageImpl } from "../types/Pageable";
import { Version } from "../types/Version";

const useVersions = (pageable: Pageable) => {
  return useQuery<PageImpl<Version>, Error>(
    ["query-versions", pageable],
    async () => {
      return await ServerApi.getVersions(pageable);
    },
  );
};

export default useVersions;
