import ServerApi from "../api/ServerApi";
import { useContext, useEffect } from "react";
import { Context as UserContext } from "../context/UserContext";

const useAuthenticatedUser = () => {
  const {
    state: { user },
    setUser,
  } = useContext(UserContext);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (!user && jwt) {
      ServerApi.getAuthenticatedUser(jwt)
        .then((response) => {
          console.log("Successfully fetched authenticated user");

          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  return [];
};

export default useAuthenticatedUser;
