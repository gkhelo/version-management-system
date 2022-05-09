import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar } from "./AppBar";
import Drawer from "../../components/drawer/Drawer";
import Main from "./Main";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { Button } from "@mui/material";
// import Button from "@mui/material/Button";

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

const MainContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles(open);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

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
            ვერსიების მართვის სისტემა
          </Typography>

          <Button disableElevation className={classes.logoutButton}>
            გასვლა
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
      <Main>{children}</Main>
    </Box>
  );
};

export default MainContainer;
