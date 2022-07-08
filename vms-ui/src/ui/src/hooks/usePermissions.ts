import { useContext } from "react";
import { Context as UserContext } from "../context/UserContext";
import { Role } from "../types/User";

const usePermissions = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  const hasPermission = (roles: Role[]): boolean => {
    if (!user || !user.role) {
      return false;
    }
    return roles.includes(user.role);
  };

  return { hasPermission: hasPermission };
};

export default usePermissions;
