import { FC, useContext, useRef, useState } from "react";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import FormikSelect from "../../components/FormikSelect";
import { Version } from "../../types/Version";
import { Application } from "../../types/Application";
import useApplications from "../../hooks/useApplications";
import { Context as UserContext } from "../../context/UserContext";
import FormikTextfield from "../../components/FormikTextfield";
import * as yup from "yup";
import ServerApi from "../../api/ServerApi";
import { saveAs } from "file-saver";
import SimpleButton from "../../components/SimpleButton";
import FormButtonWrapper from "../../components/FormButtonWrapper";
import FormTitle from "../../components/FormTitle";
import { MarkdownEditor, MarkdownText } from "../../components/VMSMarkdown";

const validationSchema = yup.object({
  description: yup.string().required("Description is required").nullable(),
  application: yup.object().required("Application is required").nullable(),
});

const VersionForm: FC<{
  action: string;
  version: Version | null;
  onSubmitHandler: Function;
}> = ({ action, version, onSubmitHandler }) => {
  const { t } = useTranslation();
  const {
    state: { user },
  } = useContext(UserContext);

  const initialValues: Version = version
    ? { ...version }
    : { id: 0, description: null, application: null };
  const applications = useApplications({
    page: 0,
    size: 10,
  });

  const [desc, setDesc] = useState<string>(version?.readme || "");
  const [descEditMode, setDescEditMode] = useState<boolean>(false);

  const [filenames, setFilenames] = useState(
    version && version.filenames ? version.filenames : []
  );
  const descriptionRef = useRef(null);
  const [titleValues, setTitleValues] = useState({
    application: version?.application?.name || t("application"),
    description: version?.description || t("description"),
  });
  const updateTitle = () => {
    if (
      !descriptionRef ||
      !descriptionRef.current ||
      !descriptionRef.current["values"]
    ) {
      return;
    }
    const values: Version = descriptionRef.current["values"];
    setTitleValues({
      application: values?.application?.name || t("application"),
      description: values?.description || t("description"),
    });
  };

  return (
    <>
      <FormTitle variant="h5" color="primary">
        {titleValues.application}/{titleValues.description}
      </FormTitle>
      <Divider sx={{ mb: 1 }} />
      <Container maxWidth={false}>
        <Formik
          innerRef={descriptionRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // @ts-ignore
            values.filenames = filenames;
            values.application = applications.data?.content.find(
              (application: Application) =>
                application.id === values.application?.id
            );
            onSubmitHandler(action, values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <Stack direction="column" spacing={2}>
                <FormikTextfield<Version>
                  name="description"
                  label={t("description")}
                  inputProps={{ readOnly: action === "view" }}
                  onBlur={updateTitle}
                />
                <FormikSelect<Version>
                  name="application.id"
                  label={t("application")}
                  inputProps={{ readOnly: action === "view" }}
                  onBlur={updateTitle}
                  getValue={(application: Application) => application.id}
                  renderValue={(application: Application) => application.name}
                  data={
                    applications.data
                      ? applications.data.content.filter((app: Application) => {
                          return (
                            user != null && app.vendorId === user.companyId
                          );
                        })
                      : []
                  }
                />

                {version && (
                  <List>
                    {filenames.map((filename: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText>{filename}</ListItemText>
                        <Button
                          onClick={() => {
                            if (version.id) {
                              ServerApi.getVersionFile(
                                version.id,
                                filename
                              ).then((data: Blob) => {
                                saveAs(data, filename);
                              });
                            }
                          }}
                        >
                          {t("download")}
                        </Button>
                        {action !== "view" && (
                          <Button
                            onClick={() => {
                              const updatedNames = filenames.filter(
                                (cur) => cur !== filename
                              );
                              setFilenames(updatedNames as [string]);
                            }}
                          >
                            {t("delete")}
                          </Button>
                        )}
                      </ListItem>
                    ))}
                  </List>
                )}

                {action !== "view" && (
                  <input
                    name="files"
                    type="file"
                    multiple
                    onChange={(event) => {
                      const files =
                        (event.target as HTMLInputElement).files || [];
                      const updatedNames = Array.from(files).map(file => file.name);
                      updatedNames.push(... filenames);
                      setFilenames(updatedNames as [string]);

                      props.setFieldValue("files", files);
                    }}
                  />
                )}
                <div>
                  <Typography
                    sx={{ mb: 0, fontWeight: "bold" }}
                    variant="body1"
                  >
                    {t("description")}
                  </Typography>
                  {descEditMode ? (
                    <MarkdownEditor
                      name="readme"
                      value={desc}
                      onChange={setDesc}
                      onCancel={() => {
                        setDesc(props.values["readme"] || "");
                        setDescEditMode(false);
                      }}
                      onSave={() => {
                        props.setFieldValue("readme", desc);
                        setDescEditMode(false);
                      }}
                    />
                  ) : (
                    <MarkdownText
                      value={desc}
                      onClick={() => setDescEditMode(true)}
                    />
                  )}
                </div>
                {action !== "view" && (
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
                )}
              </Stack>
            </form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default VersionForm;
