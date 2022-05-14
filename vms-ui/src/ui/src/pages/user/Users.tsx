import { useTranslation } from "react-i18next";
import VMSDatagrid from "../../components/VMSDatagrid";
import useDateFormatter from "../../hooks/UseDateTimeFormatter";
import usePageSelector from "../../hooks/usePageSelector";
import useUsers from "../../hooks/useUsers";
import usePagination from "../../hooks/usePagination";

const Users: React.FC = () => {
  usePageSelector("users");
  const { dataGridValueFormatter } = useDateFormatter();
  const { t } = useTranslation();
  const pagination = usePagination([]);
  const userData = useUsers({
    page: pagination.page,
    size: pagination.pageSize,
    sortBy: pagination.sortModel ? pagination.sortModel[0]?.field : null,
    sortDirection: pagination.sortModel ? pagination.sortModel[0]?.sort : null,
  });
  return (
    <>
      <h1>Users Page</h1>
      {userData.isError ? (
        <h3>{userData.error.message}</h3>
      ) : (
        userData.data && (
          <VMSDatagrid
            columns={[
              {
                field: "id",
                headerName: "ID",
                flex: 1,
              },
              { field: "username", headerName: t("username"), flex: 2 },
              { field: "firstname", headerName: t("firstname"), flex: 2 },
              { field: "lastname", headerName: t("lastname"), flex: 2 },
              { field: "email", headerName: t("email"), flex: 2 },
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
            rows={userData.data.content}
            rowCount={userData.data.totalElements}
            {...pagination}
          />
        )
      )}
    </>
  );
};

export default Users;
