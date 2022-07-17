import { FC } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Container, Stack } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import FormikTextfield from "../../components/FormikTextfield";
import FormikSelect from "../../components/FormikSelect";
import FormButtonWrapper from "../../components/FormButtonWrapper";
import SimpleButton from "../../components/SimpleButton";
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
    <Container maxWidth={false}>
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
                label={t("vendor")}
                getValue={(vendor: Company) => vendor.id}
                renderValue={(vendor: Company) => vendor.name}
                data={vendors.data}
              />
              <FormButtonWrapper>
                <SimpleButton
                  size="small"
                  color="success"
                  variant="contained"
                  disableElevation
                  startIcon={<SaveIcon />}
                  type="submit"
                >
                  {t("save")}
                </SimpleButton>
              </FormButtonWrapper>
            </Stack>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ApplicationForm;
