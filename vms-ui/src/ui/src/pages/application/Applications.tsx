import { Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-location";
import { useTranslation } from "react-i18next";
import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import VMSDatagrid from "../../components/VMSDatagrid";
import useApplications from "../../hooks/useApplications";
import useDateFormatter from "../../hooks/UseDateTimeFormatter";
import useDeleteMutation from "../../hooks/useDeleteMutation";
import usePageSelector from "../../hooks/usePageSelector";
import usePagination from "../../hooks/usePagination";
import { QueryKeyType } from "../../types/QueryKeyType";

const Applications = () => {
  usePageSelector("applications");
  const { dataGridValueFormatter } = useDateFormatter();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const deleteUser = useDeleteMutation(QueryKeyType.APPLICATIONS);
  const pagination = usePagination([]);
  const applicationsData = useApplications({
    page: pagination.page,
    size: pagination.pageSize,
    sortBy: pagination.sortModel ? pagination.sortModel[0]?.field : null,
    sortDirection: pagination.sortModel ? pagination.sortModel[0]?.sort : null,
  });

  const navigateToApplication = (applicationId: string | number) => {
    console.log(`Navigate to application ${applicationId}`);
    // navigate({ to: `/users/${userId}` });
  };

  const navigateToNewApplication = () => {
    console.log(`Navigate to new application`);
    // navigate({ to: `/users/new` });
  };

  return (
    <>
      <VMSBreadcrumbs
        links={[{ location: "/applications", name: t("Applications") }]}
      />

      {applicationsData.isError ? (
        <h3>{applicationsData.error.message}</h3>
      ) : (
        applicationsData.data && (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              sx={{ marginBottom: 0.5 }}
              onClick={navigateToNewApplication}
            >
              {t("Add Application")}
            </Button>
            <VMSDatagrid
              columns={[
                { field: "name", headerName: t("name"), flex: 2 },
                { field: "companyName", headerName: t("companyName"), flex: 2 },
                { field: "vendorName", headerName: t("vendorName"), flex: 2 },
                {
                  field: "createTime",
                  headerName: t("createTime"),
                  flex: 2,
                  valueFormatter: dataGridValueFormatter,
                },
                {
                  field: "updateTime",
                  headerName: t("updateTime"),
                  flex: 2,
                  valueFormatter: dataGridValueFormatter,
                },
                {
                  field: "actions",
                  type: "actions",
                  flex: 1,
                  getActions: (params: GridRowParams) => [
                    <GridActionsCellItem
                      icon={<EditIcon />}
                      label={t("editUser")}
                      onClick={() => navigateToApplication(params.id)}
                    />,
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label={t("deleteUser")}
                      onClick={() => deleteUser(params.id)}
                    />,
                  ],
                },
              ]}
              rows={applicationsData.data.content}
              rowCount={applicationsData.data.totalElements}
              {...pagination}
            />
          </>
        )
      )}
    </>
  );
};

export default Applications;
