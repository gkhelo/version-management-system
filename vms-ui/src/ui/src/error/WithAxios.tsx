import { FC, ReactNode, SyntheticEvent, useContext, useMemo } from "react";
import { Snackbar } from "@mui/material";
import { apiAxiosInstance, authAxiosInstance } from "../utils/AxiosInstance";
import { Context as SnackbarContext } from "../context/SnackbarContext";
import SnackbarAlert from "../components/SnackbarAlert";
import { Severity } from "../types/SnackbarMessage";
import { useTranslation } from "react-i18next";

const WithAxios: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    state: { message },
    setSnackbarMessage,
  } = useContext(SnackbarContext);
  const { t } = useTranslation();

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarMessage(null);
  };

  useMemo(() => {
    authAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        setSnackbarMessage({
          message: error.response.data.message || error.response.statusText,
          status: error.response.status,
          severity: Severity.ERROR,
        });
      }
    );
  }, [setSnackbarMessage]);

  useMemo(() => {
    apiAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        setSnackbarMessage({
          message: error.response.data.message || error.response.statusText,
          status: error.response.status,
          severity: Severity.ERROR,
        });
      }
    );
  }, [setSnackbarMessage]);

  return (
    <>
      {children}
      {message && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={message !== null}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <SnackbarAlert
            onClose={handleClose}
            severity={message.severity}
            sx={{ width: "100%" }}
          >
            {message?.message && t(message.message)}
          </SnackbarAlert>
        </Snackbar>
      )}
    </>
  );
};

export default WithAxios;
