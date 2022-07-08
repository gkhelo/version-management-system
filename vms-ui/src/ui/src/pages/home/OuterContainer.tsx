import { FC, ReactNode, useState } from "react";
import { Container, IconButton } from "@mui/material";
import { Translate as TranslateIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import SettingsDrawer from "../../components/drawer/SettingsDrawer";

const SettingsBar = styled("div")(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const OuterContainer: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Container maxWidth={false}>
      <SettingsBar>
        <IconButton size="small" color="primary" onClick={() => setOpen(true)}>
          <TranslateIcon />
        </IconButton>
      </SettingsBar>
      <SettingsDrawer open={open} setOpen={setOpen} />
      {children}
    </Container>
  );
};

export default OuterContainer;
