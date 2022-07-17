import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import VMSDatagrid from "../../components/VMSDatagrid";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import useDateFormatter from "../../hooks/UseDateTimeFormatter";
import usePageSelector from "../../hooks/usePageSelector";
import usePagination from "../../hooks/usePagination";
import useVersions from "../../hooks/useVersions";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-location";
import {
  GridActionsCellItem,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Context as UserContext } from "../../context/UserContext";
import useApplications from "../../hooks/useApplications";
import { Application } from "../../types/Application";
import VersionStatusChip from "./VersionStatusChip";
import { VersionStatus } from "../../types/Version";

const VersionsPage: FC = () => {
  usePageSelector("versions");
  const { dataGridValueFormatter } = useDateFormatter();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pagination = usePagination([]);
  const versionData = useVersions({
    page: pagination.page,
    size: pagination.pageSize,
    sortBy: pagination.sortModel ? pagination.sortModel[0]?.field : null,
    sortDirection: pagination.sortModel ? pagination.sortModel[0]?.sort : null,
  });

  const {
    state: { user },
  } = useContext(UserContext);

  const applications = useApplications({ page: 0, size: 10 });
  const hasApplications =
    applications.data &&
    applications.data?.content.some(
      (app: Application) => app.vendorId === user?.companyId
    );

  const navigateToVersion = (versionId: string | number, action: string) => {
    navigate({ to: `/versions/${action}/${versionId}` });
  };

  const navigateToAddVersion = () => {
    navigate({ to: `/versions/add/` });
  };

  return (
    <>
      <VMSBreadcrumbs
        links={[{ location: "/versions", name: t("Versions") }]}
      />

      {versionData.isError ? (
        <h3>{versionData.error.message}</h3>
      ) : (
        versionData.data && (
          <>
            {hasApplications && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                sx={{ marginBottom: 0.5 }}
                onClick={navigateToAddVersion}
              >
                {t("addVersion")}
              </Button>
            )}
            <VMSDatagrid
              columns={[
                {
                  field: "id",
                  headerName: "ID",
                  flex: 0.5,
                },
                {
                  field: "application",
                  headerName: t("application"),
                  flex: 2,
                  valueGetter: (params: GridValueGetterParams) =>
                    params.value.name,
                },
                { field: "description", headerName: t("description"), flex: 2 },
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
                  field: "status",
                  headerName: t("status"),
                  flex: 1,
                  renderCell: (params: GridRenderCellParams) => (
                    <VersionStatusChip status={params.value as VersionStatus} />
                  ),
                },
                {
                  field: "actions",
                  type: "actions",
                  flex: 1,
                  getActions: (params: GridRowParams) => {
                    const actions = [
                      <GridActionsCellItem
                        icon={<ViewIcon />}
                        label={t("viewVersion")}
                        onClick={() => navigateToVersion(params.id, "view")}
                      />,
                    ];
                    if (
                      user === null ||
                      user.companyId === params.row.application.vendorId
                    ) {
                      // Only vendor users can edit version
                      actions.push(
                        <GridActionsCellItem
                          icon={<EditIcon />}
                          label={t("editVersion")}
                          onClick={() => navigateToVersion(params.id, "edit")}
                        />
                      );
                    }

                    return actions;
                  },
                },
              ]}
              rows={versionData.data.content}
              rowCount={versionData.data.totalElements}
              {...pagination}
            />
          </>
        )
      )}
    </>
  );
};

export default VersionsPage;
