import { Box, TextField } from "@mui/material";

const CompanyStep = (props: any) => {
  const formik = props.formik;
  return (
    <Box sx={{ mt: 1 }}>
      <form>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="companyName"
          autoComplete="name"
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.companyName}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="companyEmail"
          type="email"
          autoComplete="email"
          onChange={formik.handleChange}
          value={formik.values.companyEmail}
        />
      </form>
    </Box>
  );
};

export default CompanyStep;
