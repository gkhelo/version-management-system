import { Box } from "@mui/material";
import FormikTextfield from "../../../components/FormikTextfield";
import { useTranslation } from "react-i18next";

const CompanyStep = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ mt: 1 }}>
      <FormikTextfield
        margin="normal"
        fullWidth
        label={t("name")}
        name="companyName"
        autoFocus
      />
      <FormikTextfield
        margin="normal"
        fullWidth
        label={t("email")}
        name="companyEmail"
      />
    </Box>
  );
};

export default CompanyStep;
