import { FC, useContext } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Button, Container, Paper, Stack } from "@mui/material";
import FormikSelect from "../../components/FormikSelect";
import { Version } from "../../types/Version";
import { Application } from "../../types/Application";
import useApplications from "../../hooks/useApplications";
import { Context as UserContext } from "../../context/UserContext";
import FormikTextfield from "../../components/FormikTextfield";
import * as yup from "yup";

const validationSchema = yup.object({
  description: yup.string().required("Description is required").nullable(),
  application: yup.object().required("Application is required").nullable(),
});

const VersionForm: FC<{ onSubmitHandler: Function }> = ({
  onSubmitHandler,
}) => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(UserContext);

  const applications = useApplications();

  return (
    <Container maxWidth={false} disableGutters>
      <Paper variant="outlined" sx={{ p: 2, m: 0 }}>
        <Formik
          initialValues={{
            "description": null,
            "application": null
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            onSubmitHandler(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Stack direction="column" spacing={2}>
                <FormikTextfield<Version> name="description" label={t("description")} />
                <FormikSelect<Version>
                  name="application"
                  label={t("application")}
                  getValue={(application: Application) => application}
                  renderValue={(application: Application) => application.name}
                  data={
                    applications.data ? applications.data.filter(app => {
                      return user != null && app.vendorId === user.companyId;
                    }) : []
                  }
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

export default VersionForm;
