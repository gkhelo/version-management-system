import { FC } from "react";
import { useTranslation } from "react-i18next";
import VMSDatagrid from "../../components/VMSDatagrid";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import useDateFormatter from "../../hooks/UseDateTimeFormatter";
import usePageSelector from "../../hooks/usePageSelector";
import usePagination from "../../hooks/usePagination";
import useVersions from "../../hooks/useVersions";

const VersionsPage: FC = () => {
  usePageSelector("versions");
  const { dataGridValueFormatter } = useDateFormatter();
  const { t } = useTranslation();
  const pagination = usePagination([]);
  const versionData = useVersions({
    page: pagination.page,
    size: pagination.pageSize,
    sortBy: pagination.sortModel ? pagination.sortModel[0]?.field : null,
    sortDirection: pagination.sortModel ? pagination.sortModel[0]?.sort : null,
  });

  return (
    <>
      <VMSBreadcrumbs links={[{ location: "/versions", name: t("Versions") }]} />

      {versionData.isError ? (
        <h3>{versionData.error.message}</h3>
      ) : (
        versionData.data && (
          <>
            <VMSDatagrid
              columns={[
                {
                  field: "id",
                  headerName: "ID",
                  flex: 0.5,
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
