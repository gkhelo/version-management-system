import { Box } from "@mui/material";
import FormikTextfield from "../../../components/FormikTextfield";

const CompanyStep = () => {
  return (
    <Box sx={{ mt: 1 }}>
      <FormikTextfield
        margin="normal"
        fullWidth
        label="Name"
        name="companyName"
        autoFocus
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label="Email"
        name="companyEmail"
      />
    </Box>
  );
};

export default CompanyStep;
