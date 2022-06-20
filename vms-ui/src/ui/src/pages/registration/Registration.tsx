import * as React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import { useFormik } from "formik";
import LinearStepper from "./LinearStepper";
import CompanyStep from "./steps/CompanyStep";
import AdminStep from "./steps/AdminStep";
import { Company } from "../../types/Company";
import { Role, User } from "../../types/User";
import ServerApi from "../../api/ServerApi";

const Registration = () => {
  const companyFormik = useFormik({
    initialValues: {
      companyName: "",
      companyEmail: "",
    },
    onSubmit: () => {
    },
  });

  const adminFormik = useFormik({
    initialValues: {
      adminUsername: "",
      adminPassword: "",
      adminFirstname: "",
      adminLastname: "",
      adminEmail: "",
    },
    onSubmit: () => {
    },
  });

  const steps = [
    { name: "Company", component: <CompanyStep formik={companyFormik} /> },
    { name: "Admin", component: <AdminStep formik={adminFormik} /> },
  ];

  const handleSubmit = () => {
    const company: Company = {
      name: companyFormik.values.companyName,
      email: companyFormik.values.companyEmail,
    };

    const admin: User = {
      id: 0,
      username: adminFormik.values.adminUsername,
      password: adminFormik.values.adminPassword,
      firstname: adminFormik.values.adminFirstname,
      lastname: adminFormik.values.adminLastname,
      email: adminFormik.values.adminEmail,
      role: Role.ADMIN,
    };

    ServerApi.register(company, admin)
      .then(() => {
        console.log("Company registered successfully");

        // TODO: show that registration completed successfully
        // TODO: show link/button "Go to login page"
        window.location.reload();
      })
      .catch((error) => {
        // TODO: show errors
        console.log("Registration error", error);
      });
  };

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
        <h1>Registration Form</h1>
        <LinearStepper steps={steps} handleSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default Registration;
