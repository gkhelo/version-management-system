import { FC, useContext, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import makeStyles from "@mui/styles/makeStyles";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import { Context as UserContext } from "../../context/UserContext";
import Drawer from "../../components/drawer/Drawer";
import Login from "../login/Login";
import Main from "./Main";
import { AppBar } from "./AppBar";

const useStyles = makeStyles(() => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  main: {
    display: "flex",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
    color: "white",
  },
  menuButton: {
    color: "white !important",
    marginRight: "36px !important",
    display: (open) => (open ? "none" : "block"),
  },
  logoutButton: { color: "white !important" },
  container: {
    marginTop: "20px",
  },
}));

const MainContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    state: { user },
    setUser,
  } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const classes = useStyles(open);
  const { t } = useTranslation();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  useAuthenticatedUser();
  if (!user) {
    return <Login />;
  }

  return (
    <Box className={classes.main}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            {t("Version Management System")}
          </Typography>

          <Button
            disableElevation
            className={classes.logoutButton}
            onClick={handleLogout}
          >
            {t("logout")}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
      <Main>{children}</Main>
    </Box>
  );
};

export default MainContainer;
