import { FC, MouseEventHandler, ReactNode } from "react";
import { styled } from "@mui/system";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "40vw",
  },
  "& .MuiDialogActions-root": {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  "& .MuiDialog-container": {
    position: "fixed",
    top: 0,
    left: "50%",
    maxHeight: "80vh",
    transform: "translateX(-50%)",
    overflow: "auto",
    alignItems: "start",
    margin: "10vh auto",
  },
}));

export const BootstrapDialogTitle: FC<BootstrapDialogTitleProps> = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 1, p: 1 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const BootstrapDialogContent = styled(DialogContent)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
}));

type BootstrapDialogTitleProps = {
  children?: ReactNode;
  onClose: MouseEventHandler<HTMLButtonElement>;
};
