import { FC } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { Container, Paper, Stack } from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import FormikSelect from "../../components/FormikSelect";
import FormikTextfield from "../../components/FormikTextfield";
import useRoles from "../../hooks/useRoles";
import { User } from "../../types/User";
import FormButtonWrapper from "../../components/FormButtonWrapper";
import SimpleButton from "../../components/SimpleButton";

const validationSchema = yup.object({
  username: yup.string().required("Username is required").nullable(),
  firstname: yup.string().required("Firstname is required").nullable(),
  lastname: yup.string().required("Lastname is required").nullable(),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required")
    .nullable(),
  role: yup.string().required("Role is required").nullable(),
  password: yup
    .string()
    .default(null)
    .defined()
    .min(8, "Password should be of minimum min characters length")
    .when("id", {
      is: 0,
      then: yup.string().required("Password is required").default("").defined(),
      otherwise: yup.string().nullable(),
    }),
  confirmPassword: yup
    .string()
    .when("id", {
      is: 0,
      then: yup.string().default("").defined(),
      otherwise: yup.string().nullable().default(null).defined(),
    })
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const UserForm: FC<{ user: User | null; onSubmitHandler: Function }> = ({
  user,
  onSubmitHandler,
}) => {
  const { t } = useTranslation();
  const initialValues: User = user ? { ...user } : { id: 0 };

  const roles = useRoles();

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
                <FormikTextfield<User> name="username" label={t("username")} />
                <FormikTextfield<User>
                  name="firstname"
                  label={t("firstname")}
                />
                <FormikTextfield<User> name="lastname" label={t("lastname")} />
                <FormikTextfield<User> name="email" label={t("email")} />
                <FormikSelect<User>
                  name="role"
                  label={t("role")}
                  getValue={(role: string) => role}
                  renderValue={(role: string) => role}
                  data={roles.data}
                />
                <FormikTextfield<User>
                  name="password"
                  label={t("password")}
                  type="password"
                />
                <FormikTextfield<User>
                  name="confirmPassword"
                  label={t("confirmPassword")}
                  type="password"
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
      </Paper>
    </Container>
  );
};

export default UserForm;
