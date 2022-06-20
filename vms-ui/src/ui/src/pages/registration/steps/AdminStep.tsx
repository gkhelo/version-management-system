import { Box, TextField } from "@mui/material";

const AdminStep = (props: any) => {
  const formik = props.formik;
  return (
    <Box sx={{ mt: 1 }}>
      <form>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="adminUsername"
          autoComplete="username"
          autoFocus
          onChange={formik.handleChange}
          value={formik.values.adminUsername}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="adminPassword"
          type="password"
          autoComplete="password"
          onChange={formik.handleChange}
          value={formik.values.adminPassword}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="firstname"
          label="Firstname"
          name="adminFirstname"
          autoComplete="firstname"
          onChange={formik.handleChange}
          value={formik.values.adminFirstname}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="lastname"
          label="Lastname"
          name="adminLastname"
          autoComplete="lastname"
          onChange={formik.handleChange}
          value={formik.values.adminLastname}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="adminEmail"
          type="email"
          autoComplete="email"
          onChange={formik.handleChange}
          value={formik.values.adminEmail}
        />
      </form>
    </Box>
  );
};

export default AdminStep;
