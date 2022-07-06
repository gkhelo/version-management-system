import { FC, useContext, useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { Button, Container, List, ListItem, ListItemText, Paper, Stack } from "@mui/material";
import FormikSelect from "../../components/FormikSelect";
import { Version } from "../../types/Version";
import { Application } from "../../types/Application";
import useApplications from "../../hooks/useApplications";
import { Context as UserContext } from "../../context/UserContext";
import FormikTextfield from "../../components/FormikTextfield";
import * as yup from "yup";
import ServerApi from "../../api/ServerApi";
import { saveAs } from "file-saver";

const validationSchema = yup.object({
  description: yup.string().required("Description is required").nullable(),
  application: yup.object().required("Application is required").nullable(),
});

const VersionForm: FC<{ action: string, version: Version | null, onSubmitHandler: Function }> = ({
  action,
  version,
  onSubmitHandler,
}) => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(UserContext);

  const initialValues: Version = version ? { ...version } : { id: 0, description: null, application: null };
  const applications = useApplications({
    page: 0,
    size: 10,
  });

  const [filenames, setFilenames] = useState(version && version.filenames ? version.filenames : []);
  return (
    <Container maxWidth={false} disableGutters>
      <Paper variant="outlined" sx={{ p: 2, m: 0 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // @ts-ignore
            values.filenames = filenames;
            onSubmitHandler(action, values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Stack direction="column" spacing={2}>
                <FormikTextfield<Version>
                  name="description"
                  label={t("description")}
                  inputProps={
                    { readOnly: action === "view", }
                  }
                />
                <FormikSelect<Version>
                  name="application"
                  label={t("application")}
                  inputProps={
                    { readOnly: action === "view", }
                  }
                  getValue={(application: Application) => application}
                  renderValue={(application: Application) => application.name}
                  data={
                    applications.data ? applications.data.content.filter(app => {
                      return user != null && app.vendorId === user.companyId;
                    }) : []
                  }
                />

                {version &&
                  <List>
                    {filenames.map((filename: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText>{filename}</ListItemText>
                        <Button onClick={() => {
                          if (version.id) {
                            ServerApi.getVersionFile(version.id, filename)
                              .then((data: Blob) => {
                                saveAs(data, filename);
                              });
                          }
                        }}>{t("download")}</Button>
                        {action !== "view" &&
                          <Button onClick={() => {
                            const updatedNames = filenames.filter((cur) => cur != filename);
                            setFilenames(updatedNames as [string]);
                          }}>{t("delete")}</Button>
                        }
                      </ListItem>
                    ))}
                  </List>
                }

                {action !== "view" &&
                  <input name="files" type="file" multiple onChange={(event) => {
                    const files = (event.target as HTMLInputElement).files || [];
                    props.setFieldValue("files", files);
                  }}/>
                }

                {action !== "view" &&
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  {t("save")}
                </Button>
                }
              </Stack>
            </form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default VersionForm;
