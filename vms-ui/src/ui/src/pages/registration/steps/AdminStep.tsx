import { Box } from "@mui/material";
import FormikTextfield from "../../../components/FormikTextfield";

const AdminStep = () => {
  return (
    <Box sx={{ mt: 1 }}>
      <FormikTextfield
        margin="normal"
        fullWidth
        label="Username"
        name="adminUsername"
        autoFocus
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label="Password"
        name="adminPassword"
        type="password"
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label="Firstname"
        name="adminFirstname"
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label="Lastname"
        name="adminLastname"
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label="Email"
        name="adminEmail"
      />
    </Box>
  );
};

export default AdminStep;
