import { FC } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Button, Container, Stack } from "@mui/material";
import FormikTextfield from "../../components/FormikTextfield";
import FormikSelect from "../../components/FormikSelect";
import FormButtonWrapper from "../../components/FormButtonWrapper";
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
    <Container maxWidth="sm">
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
              <FormButtonWrapper>
                <Button color="primary" variant="contained" type="submit">
                  {t("save")}
                </Button>
              </FormButtonWrapper>
            </Stack>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default ApplicationForm;
