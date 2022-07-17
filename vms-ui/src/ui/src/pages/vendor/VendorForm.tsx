import { FC } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { Container, Stack } from "@mui/material";
import FormikSelect from "../../components/FormikSelect";
import useCompanies from "../../hooks/useCompanies";
import { Company } from "../../types/Company";
import SimpleButton from "../../components/SimpleButton";
import {Save as SaveIcon} from "@mui/icons-material";
import FormButtonWrapper from "../../components/FormButtonWrapper";

const validationSchema = yup.object({
  vendorId: yup.string().required("Vendor is required").nullable(),
});

const VendorForm: FC<{ usedVendors: (number | undefined)[], onSubmitHandler: Function }> = ({
  usedVendors,
  onSubmitHandler,
}) => {
  const { t } = useTranslation();

  const companies = useCompanies();

  return (
    <Container maxWidth={false}>
      <Formik
        initialValues={{
          "vendorId": null
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          onSubmitHandler(values.vendorId);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Stack direction="column" spacing={2}>
              <FormikSelect<Company>
                name="vendorId"
                label={t("vendor")}
                getValue={(vendor: Company) => vendor.id}
                renderValue={(vendor: Company) => vendor.name}
                data={
                  companies.data ? companies.data.filter(c => !usedVendors.includes(c.id)) : []
                }
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
                  {t("Save")}
                </SimpleButton>
              </FormButtonWrapper>
            </Stack>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default VendorForm;
