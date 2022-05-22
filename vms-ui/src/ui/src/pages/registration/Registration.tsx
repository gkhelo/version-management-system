import * as React from "react";
import { Container, CssBaseline, Box } from "@mui/material";
import { useFormik } from "formik";
import LinearStepper from "./LinearStepper";
import CompanyStep from "./steps/CompanyStep";
import AdminStep from "./steps/AdminStep";

const Registration = () => {
  const companyFormik = useFormik({
    initialValues: {
      companyName: "",
      companyEmail: "",
    },
    onSubmit: () => {
    }
  })

  const adminFormik = useFormik({
    initialValues: {
      adminUsername: "",
      adminFirstname: "",
      adminLastname: "",
      adminEmail: ""
    },
    onSubmit: () => {
    }
  });

  const steps = [
    { name: "Company", component: <CompanyStep formik={ companyFormik }/> },
    { name: "Admin", component: <AdminStep formik={ adminFormik }/> }
  ];

  const handleSubmit = () => {
    // TODO: Register company and admin
    console.log("Submit data:");
    console.log(companyFormik.values);
    console.log(adminFormik.values);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h1>Registration Form</h1>
        <LinearStepper steps={ steps } handleSubmit={ handleSubmit }/>
      </Box>
    </Container>
  )
}

export default Registration;
