import { FC } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Button, Container, Paper, Stack } from "@mui/material";
import FormikTextfield from "../../components/FormikTextfield";
import FormikSelect from "../../components/FormikSelect";
import useVendors from "../../hooks/useVendors";
import { Application } from "../../types/Application";
import { Company } from "../../types/Company";

const validationSchema = yup.object({
  name: yup.string().required("Name is required").nullable(),
  vendorId: yup.number().required("Vendor is required").nullable(),
});

const ApplicationForm: FC<{
  application: Application | null;
  onSubmitHandler: Function;
}> = ({ application, onSubmitHandler }) => {
  const { t } = useTranslation();
  const initialValues: Application = { ...application };
  const vendors = useVendors();
  return (
    <Container maxWidth={false} disableGutters>
      <Paper variant="outlined" sx={{ p: 2, m: 0 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Stack direction="column" spacing={2}>
                <FormikTextfield<Application> name="name" label={t("name")} />
                <FormikSelect<Application>
                  name="vendorId"
                  label={"vendor"}
                  getValue={(vendor: Company) => vendor.id}
                  renderValue={(vendor: Company) => vendor.name}
                  data={vendors.data}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  {t("save")}
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ApplicationForm;
