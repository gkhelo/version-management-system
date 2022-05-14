import VMSDatagrid from "../../components/VMSDatagrid";
import useDateFormatter from "../../hooks/UseDateTimeFormatter";
import usePageSelector from "../../hooks/usePageSelector";
import useUsers from "../../hooks/useUsers";

const Users = () => {
  usePageSelector("users");
  const { dataGridValueFormatter } = useDateFormatter();

  const userData = useUsers();

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
              { field: "username", headerName: "Username", flex: 2 },
              { field: "firstname", headerName: "Firstname", flex: 2 },
              { field: "lastname", headerName: "Lastname", flex: 2 },
              { field: "email", headerName: "Email", flex: 2 },
              {
                field: "createTime",
                headerName: "Creation Time",
                flex: 2,
                valueFormatter: dataGridValueFormatter,
              },
              {
                field: "updateTime",
                headerName: "Update Time",
                flex: 2,
                valueFormatter: dataGridValueFormatter,
              },
            ]}
            rows={userData.data}
          />
        )
      )}
    </>
  );
};

export default Users;
