import { FC, useContext, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import {
  Avatar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import makeStyles from "@mui/styles/makeStyles";
import useAuthenticatedUser from "../../hooks/useAuthenticatedUser";
import { Context as UserContext } from "../../context/UserContext";
import { Context as AppContext } from "../../context/AppContext";
import Drawer from "../../components/drawer/Drawer";
import Login from "../login/Login";
import Main from "./Main";
import { AppBar } from "./AppBar";
import SettingsDrawer from "../../components/drawer/SettingsDrawer";
import { stringAvatar } from "../../components/UserListItem";

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
  const { setCurrentPage } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [settingsDrawerOpen, setSettingsDrawerOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const classes = useStyles(open);
  const { t } = useTranslation();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    queryClient.invalidateQueries();
    setCurrentPage("");
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
          <Avatar
            style={{ cursor: "pointer" }}
            onClick={() => setSettingsDrawerOpen(true)}
            {...stringAvatar(user.username || "Unknown")}
          />
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
      <SettingsDrawer
        open={settingsDrawerOpen}
        setOpen={setSettingsDrawerOpen}
        logout={handleLogout}
      />
      <Main>{children}</Main>
    </Box>
  );
};

export default MainContainer;
