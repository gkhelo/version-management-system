import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Close as CloseIcon, Logout as LogoutIcon } from "@mui/icons-material";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const StyledSettingsDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  zIndex: theme.zIndex.drawer + 2,
  "& .MuiPaper-root": {
    borderRadius: "10px 0px 0px 10px",
    width: 300,
    padding: 3,
    display: "flex",
    flexDirection: "column",
  },
}));

const StyledTitle = styled(Typography)(() => ({
  fontWeight: "500",
  margin: 0,
}));

const StyledParagraph = styled(Typography)(() => ({
  fontWeight: "700",
  margin: "20px 0px 10px",
  fontSize: "0.6875rem",
  letterSpacing: "0.08rem",
  textTransform: "uppercase",
  color: "rgb(111, 126, 140)",
}));

const TitleBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(1),
}));

const LanguageButton = styled(ListItemButton)(({ theme }) => ({
  display: "flex",
  flexGrow: 1,
  justifyContent: "flex-start",
  alignItems: "center",
  "&.Mui-selected": {
    color: "rgb(0, 127, 255)",
    borderRadius: "10px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderImage: "initial",
    backgroundColor: "rgb(240, 247, 255)",
    borderColor: "rgb(0, 127, 255) !important",
    "&:hover": {
      backgroundColor: "rgb(194, 224, 255)",
    },
  },
  margin: 0,
  padding: theme.spacing(1),
  fontSize: "0.875rem",
  fontWeight: "500",
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2),
  fontSize: "0.875rem",
  lineHeight: 1.75,
  borderRadius: 10,
  border: "1px solid rgb(224, 227, 231)",
  "&:hover": {
    borderColor: "rgb(205, 210, 215)",
    background: "rgb(243, 246, 249)",
  },
  textTransform: "none",
}));

const SettingsDrawer: FC<SettingsDrawerProps> = ({ open, setOpen, logout }) => {
  const { t, i18n } = useTranslation();
  const getLanguage = useCallback(() => {
    return i18n.language === "ka" ? "ka" : "en";
  }, [i18n.language]);
  const [selected, setSelected] = useState(getLanguage());

  useEffect(() => {
    setSelected(getLanguage());
  }, [getLanguage]);
  return (
    <StyledSettingsDrawer
      anchor="right"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <TitleBox role="presentation">
        <StyledTitle variant="body1" noWrap>
          {t("Settings")}
        </StyledTitle>
        <IconButton
          edge="end"
          aria-label="close"
          color="primary"
          onClick={() => setOpen(false)}
        >
          <CloseIcon />
        </IconButton>
      </TitleBox>
      <Divider />
      <Box sx={{ pl: 2, pr: 2 }}>
        <StyledParagraph variant="body1" noWrap>
          {t("language")}
        </StyledParagraph>
        <List>
          <LanguageButton
            selected={selected === "en"}
            disableGutters={false}
            onClick={() => i18n.changeLanguage("en")}
          >
            English
          </LanguageButton>
          <LanguageButton
            selected={selected === "ka"}
            disableGutters={false}
            onClick={() => i18n.changeLanguage("ka")}
          >
            ქართული
          </LanguageButton>
        </List>
      </Box>
      {logout && (
        <>
          <Divider />
          <LogoutButton
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => logout()}
          >
            {t("logout")}
          </LogoutButton>
        </>
      )}
    </StyledSettingsDrawer>
  );
};

type SettingsDrawerProps = {
  open: boolean;
  setOpen: Function;
  logout?: Function;
};

export default SettingsDrawer;
