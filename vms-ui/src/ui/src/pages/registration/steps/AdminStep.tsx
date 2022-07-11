import { Box } from "@mui/material";
import FormikTextfield from "../../../components/FormikTextfield";
import { useTranslation } from "react-i18next";

const AdminStep = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ mt: 1 }}>
      <FormikTextfield
        margin="normal"
        fullWidth
        label={t("username")}
        name="adminUsername"
        autoFocus
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label={t("password")}
        name="adminPassword"
        type="password"
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label={t("firstname")}
        name="adminFirstname"
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label={t("lastname")}
        name="adminLastname"
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label={t("email")}
        name="adminEmail"
      />
    </Box>
  );
};

export default AdminStep;
