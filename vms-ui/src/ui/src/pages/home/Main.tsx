import { FC, ReactNode } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import DrawerHeader from "../../components/drawer/DrawerHeader";

const Root = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const Main: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Root component="main">
      <DrawerHeader />
      {children}
    </Root>
  );
};

export default Main;
