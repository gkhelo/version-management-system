import { Box, Container, CssBaseline, Snackbar } from "@mui/material";
import ServerApi from "../../api/ServerApi";
import LinearStepper from "./LinearStepper";
import CompanyStep from "./steps/CompanyStep";
import AdminStep from "./steps/AdminStep";
import { Company } from "../../types/Company";
import { Role, User } from "../../types/User";
import * as yup from "yup";
import { useState } from "react";
import SnackbarAlert from "../../components/SnackbarAlert";
import { Severity } from "../../types/SnackbarMessage";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const { t } = useTranslation();

  const steps = [
    {
      name: "company",
      component: <CompanyStep />,
      initialValues: {
        companyName: "",
        companyEmail: "",
      },
      validationSchema: yup.object({
        companyName: yup.string().required("Name is required").nullable(),
        companyEmail: yup.string().email("Enter a valid email").required("Email is required").nullable(),
      }),
    },
    {
      name: "admin",
      component: <AdminStep />,
      initialValues: {
        adminUsername: "",
        adminPassword: "",
        adminFirstname: "",
        adminLastname: "",
        adminEmail: "",
      },
      validationSchema: yup.object({
        adminUsername: yup.string().required("Username is required").nullable(),
        adminPassword: yup.string().required("Password is required").min(8, "Password should be of minimum min characters length"),
        adminFirstname: yup.string().required("Firstname is required").nullable(),
        adminLastname: yup.string().required("Lastname is required").nullable(),
        adminEmail: yup.string().email("Enter a valid email").required("Email is required").nullable(),
      }),
    },
  ];

  const handleSubmit = (values: any) => {
    const company: Company = {
      name: values.companyName,
      email: values.companyEmail,
    };

    const admin: User = {
      id: 0,
      username: values.adminUsername,
      password: values.adminPassword,
      firstname: values.adminFirstname,
      lastname: values.adminLastname,
      email: values.adminEmail,
      role: Role.ADMIN,
    };

    ServerApi.register(company, admin)
      .then((response) => {
        if (response.status == 200) {
          console.log("Company registered successfully");
          setCompleted(true);
        }
      })
      .catch((error) => {
        // TODO: show errors
        console.log("Registration error", error);
      });
  };

  const handleClose = () => {
    window.location.replace("login");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{t("registrationForm")}</h1>
        <LinearStepper steps={steps} handleSubmit={handleSubmit} completed={completed}/>
      </Box>

      {completed &&
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={true}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <SnackbarAlert
          onClose={handleClose}
          severity={Severity.SUCCESS}
          sx={{ width: "100%" }}
        >
          {t("registrationCompleted")}
        </SnackbarAlert>
      </Snackbar>
      }
    </Container>
  );
};

export default Registration;
