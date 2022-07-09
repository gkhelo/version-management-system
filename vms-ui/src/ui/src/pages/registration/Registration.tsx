import { Box, Container, CssBaseline } from "@mui/material";
import ServerApi from "../../api/ServerApi";
import LinearStepper from "./LinearStepper";
import CompanyStep from "./steps/CompanyStep";
import AdminStep from "./steps/AdminStep";
import { Company } from "../../types/Company";
import { Role, User } from "../../types/User";
import * as yup from "yup";

const Registration = () => {
  const steps = [
    {
      name: "Company",
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
      name: "Admin",
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
