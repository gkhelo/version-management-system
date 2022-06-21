import { FC, ReactNode, useContext, useState } from "react";
import { Navigate, useMatches } from "@tanstack/react-location";
import LinearProgress from "@mui/material/LinearProgress";
import { Context as UserContext } from "./context/UserContext";
import useAuthenticatedUser from "./hooks/useAuthenticatedUser";
import useTimeout from "./hooks/useTimeout";
import MainContainer from "./pages/home/MainContainer";

const PathResolver: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    state: { user },
  } = useContext(UserContext);
  const [show, setShow] = useState<boolean>(false);
  const matches = useMatches();
  const isOuter = matches[matches.length - 1].route?.meta?.outer;

  useAuthenticatedUser();

  useTimeout(() => setShow(true), 100);

  return !show ? (
    <LinearProgress />
  ) : user ? (
    isOuter ? (
      <Navigate to="/" />
    ) : (
      <MainContainer>{children}</MainContainer>
    )
  ) : isOuter ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
};

export default PathResolver;
