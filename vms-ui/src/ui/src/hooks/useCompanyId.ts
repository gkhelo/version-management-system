import { useContext } from "react";
import { Context as UserContext } from "../context/UserContext";

const useCompanyId = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  return [user?.companyId];
};

export default useCompanyId;
