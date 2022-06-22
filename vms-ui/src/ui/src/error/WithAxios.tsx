import { FC, ReactNode, SyntheticEvent, useContext, useMemo } from "react";
import { apiAxiosInstance, authAxiosInstance } from "../utils/AxiosInstance";
import { Context as ErrorContext } from "../context/ErrorContext";
import { Snackbar } from "@mui/material";
import SnackbarAlert from "../components/SnackbarAlert";

const WithAxios: FC<{ children: ReactNode }> = ({ children }) => {
  const {
    state: { error },
    setError,
  } = useContext(ErrorContext);

  const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setError(null);
  };

  useMemo(() => {
    authAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        setError({
          message: error.response.data.message || error.response.statusText,
          status: error.response.status,
        });
      }
    );
  }, [setError]);

  useMemo(() => {
    apiAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        setError({
          message: error.response.data.message || error.response.statusText,
          status: error.response.status,
        });
      }
    );
  }, [setError]);

  return (
    <>
      {children}
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={error !== null}
          autoHideDuration={5000}
          onClose={handleClose}
        >
          <SnackbarAlert
            onClose={handleClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {error?.message}
          </SnackbarAlert>
        </Snackbar>
      )}
    </>
  );
};

export default WithAxios;
