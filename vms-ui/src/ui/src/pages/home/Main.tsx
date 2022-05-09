import { DrawerHeader } from "../../components/drawer/DrawerHeader";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";

const Root = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Root component="main">
      <DrawerHeader />
      {children}
    </Root>
  );
};

export default Main;
