import { Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-location";
import { useTranslation } from "react-i18next";
import {
  GridActionsCellItem,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import VMSDatagrid from "../../components/VMSDatagrid";
import useApplications from "../../hooks/useApplications";
import useDateFormatter from "../../hooks/UseDateTimeFormatter";
import usePermissions from "../../hooks/usePermissions";
import useCompanyId from "../../hooks/useCompanyId";
import useDeleteMutation from "../../hooks/useDeleteMutation";
import usePageSelector from "../../hooks/usePageSelector";
import usePagination from "../../hooks/usePagination";
import { QueryKeyType } from "../../types/QueryKeyType";
import { Role } from "../../types/User";

const ApplicationsPage = () => {
  usePageSelector("applications");
  const { dataGridValueFormatter } = useDateFormatter();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [companyId] = useCompanyId();
  const { hasPermission } = usePermissions();
  const deleteUser = useDeleteMutation(QueryKeyType.APPLICATIONS);
  const pagination = usePagination([]);
  const applicationsData = useApplications({
    page: pagination.page,
    size: pagination.pageSize,
    sortBy: pagination.sortModel ? pagination.sortModel[0]?.field : null,
    sortDirection: pagination.sortModel ? pagination.sortModel[0]?.sort : null,
  });

  const navigateToApplication = (applicationId: string | number) => {
    navigate({ to: `/applications/${applicationId}` });
  };

  const navigateToNewApplication = () => {
    navigate({ to: `/applications/new` });
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
            {hasPermission([Role.ADMIN]) && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                sx={{ marginBottom: 0.5 }}
                onClick={navigateToNewApplication}
              >
                {t("addApplication")}
              </Button>
            )}
            <VMSDatagrid
              columns={[
                { field: "name", headerName: t("name"), flex: 2 },
                {
                  field: "company.name",
                  headerName: t("companyName"),
                  flex: 2,
                  valueGetter: (params: GridValueGetterParams) =>
                    params.row.companyName,
                },
                {
                  field: "vendor.name",
                  headerName: t("vendorName"),
                  flex: 2,
                  valueGetter: (params: GridValueGetterParams) =>
                    params.row.vendorName,
                },
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
                  hide: !hasPermission([Role.ADMIN]),
                  hideable: false,
                  getActions: (params: GridRowParams) => {
                    return companyId === params.row.companyId
                      ? [
                          <GridActionsCellItem
                            icon={<EditIcon />}
                            label={t("editApplication")}
                            onClick={() => navigateToApplication(params.id)}
                          />,
                          <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label={t("deleteApplication")}
                            onClick={() => deleteUser(params.id)}
                          />,
                        ]
                      : [
                          <GridActionsCellItem
                            icon={<EditIcon />}
                            label={t("editApplication")}
                            onClick={() => navigateToApplication(params.id)}
                          />,
                        ];
                  },
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

export default ApplicationsPage;
