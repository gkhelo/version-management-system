import { FC, useContext, useEffect, useState } from "react";
import { useMatch, useNavigate } from "@tanstack/react-location";
import { useTranslation } from "react-i18next";
import { Container, Paper } from "@mui/material";
import ServerApi from "../../api/ServerApi";
import { Context as SnackbarContext } from "../../context/SnackbarContext";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import usePermissions from "../../hooks/usePermissions";
import usePageSelector from "../../hooks/usePageSelector";
import { Application } from "../../types/Application";
import { Severity } from "../../types/SnackbarMessage";
import ApplicationForm from "./ApplicationForm";
import ApplicationEdit from "./ApplicationEdit";
import { Role } from "../../types/User";

const ApplicationPage: FC = () => {
  usePageSelector("applications");
  const { t } = useTranslation();
  const {
    params: { applicationId },
  } = useMatch();
  const { setSnackbarMessage } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();

  const [application, setApplication] = useState<Application | null>(null);

  const fetchApplication = async (applicationId: number | string) => {
    const fetchedApplication = await ServerApi.getApplication(applicationId);
    setApplication(fetchedApplication);
  };

  const createNewApplication = async () => {
    setApplication({
      id: 0,
      name: null,
      companyId: null,
      companyName: null,
      vendorId: null,
      vendorName: null,
    });
  };

  const applicationSubmitHandler = async (application: Application) => {
    applicationId === "new"
      ? await ServerApi.addApplication(application).then((data) => {
          setSnackbarMessage({
            message: "Successfully added application",
            status: 200,
            severity: Severity.SUCCESS,
          });
          return data;
        })
      : await ServerApi.updateApplication(application).then((data) => {
          setSnackbarMessage({
            message: "Successfully updated application",
            status: 200,
            severity: Severity.SUCCESS,
          });
          setApplication(data);
          return data;
        });
    applicationId === "new" && navigate({ to: "/applications" });
  };

  useEffect(() => {
    !hasPermission([Role.ADMIN])
      ? navigate({ to: "/applications" })
      : applicationId === "new"
      ? createNewApplication()
      : fetchApplication(applicationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationId]);

  return (
    <>
      <VMSBreadcrumbs
        links={[
          { location: "/applications", name: t("Applications") },
          {
            name:
              applicationId === "new"
                ? t("addApplication")
                : t("editApplication"),
          },
        ]}
      />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ mr: "auto", ml: "auto" }}
      >
        <Paper variant="outlined" sx={{ p: 2, m: 0 }}>
          {application &&
            (applicationId === "new" ? (
              <ApplicationForm
                application={application}
                onSubmitHandler={applicationSubmitHandler}
              />
            ) : (
              <ApplicationEdit
                application={application}
                onSubmitHandler={applicationSubmitHandler}
              />
            ))}
        </Paper>
      </Container>
    </>
  );
};

export default ApplicationPage;
