import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-location";
import { Button } from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { GridActionsCellItem, GridRowParams } from "@mui/x-data-grid";
import VMSDatagrid from "../../components/VMSDatagrid";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import useDateFormatter from "../../hooks/UseDateTimeFormatter";
import useDeleteMutation from "../../hooks/useDeleteMutation";
import usePageSelector from "../../hooks/usePageSelector";
import usePagination from "../../hooks/usePagination";
import useUsers from "../../hooks/useUsers";
import { QueryKeyType } from "../../types/QueryKeyType";

const UsersPage: FC = () => {
  usePageSelector("users");
  const { dataGridValueFormatter } = useDateFormatter();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const deleteUser = useDeleteMutation(QueryKeyType.USERS);
  const pagination = usePagination([]);
  const userData = useUsers({
    page: pagination.page,
    size: pagination.pageSize,
    sortBy: pagination.sortModel ? pagination.sortModel[0]?.field : null,
    sortDirection: pagination.sortModel ? pagination.sortModel[0]?.sort : null,
  });

  const navigateToUser = (userId: string | number) => {
    navigate({ to: `/users/${userId}` });
  };

  const navigateToNewUser = () => {
    navigate({ to: `/users/new` });
  };

  return (
    <>
      <VMSBreadcrumbs links={[{ location: "/users", name: t("Users") }]} />

      {userData.isError ? (
        <h3>{userData.error.message}</h3>
      ) : (
        userData.data && (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              sx={{ marginBottom: 0.5 }}
              onClick={navigateToNewUser}
            >
              {t("addUser")}
            </Button>
            <VMSDatagrid
              columns={[
                {
                  field: "id",
                  headerName: "ID",
                  flex: 0.5,
                },
                { field: "username", headerName: t("username"), flex: 2 },
                { field: "firstname", headerName: t("firstname"), flex: 2 },
                { field: "lastname", headerName: t("lastname"), flex: 2 },
                { field: "email", headerName: t("email"), flex: 2 },
                { field: "role", headerName: t("role"), flex: 1 },
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
                      onClick={() => navigateToUser(params.id)}
                    />,
                    <GridActionsCellItem
                      icon={<DeleteIcon />}
                      label={t("deleteUser")}
                      onClick={() => deleteUser(params.id)}
                    />,
                  ],
                },
              ]}
              rows={userData.data.content}
              rowCount={userData.data.totalElements}
              {...pagination}
            />
          </>
        )
      )}
    </>
  );
};

export default UsersPage;
