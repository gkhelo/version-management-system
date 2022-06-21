import { useCallback, useContext, useEffect } from "react";
import ServerApi from "../api/ServerApi";
import { Context as UserContext } from "../context/UserContext";

const useAuthenticatedUser = () => {
  const {
    state: { user },
    setUser,
  } = useContext(UserContext);
  const jwt = localStorage.getItem("jwt");

  const authenticateUser = useCallback(() => {
    if (!user && jwt) {
      ServerApi.getAuthenticatedUser(jwt)
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, [jwt, setUser, user]);

  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return [];
};

export default useAuthenticatedUser;
