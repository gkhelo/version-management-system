import { FC } from "react";
import { useTranslation } from "react-i18next";
import VMSDatagrid from "../../components/VMSDatagrid";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import usePageSelector from "../../hooks/usePageSelector";
import useClients from "../../hooks/useClients";

const ClientsPage: FC = () => {
  usePageSelector("clients");
  const { t } = useTranslation();
  const clientData = useClients();

  return (
    <>
      <VMSBreadcrumbs links={[{ location: "/clients", name: t("Clients") }]}/>

      {clientData.isError ? (
        <h3>{clientData.error.message}</h3>
      ) : (
        clientData.data && (
          <>
            <VMSDatagrid
              columns={[
                { field: "id", headerName: "ID", flex: 0.5 },
                { field: "name", headerName: t("name"), flex: 2 },
                { field: "email", headerName: t("email"), flex: 2 },
              ]}
              rows={clientData.data}
            />
          </>
        )
      )}
    </>
  );
}

export default ClientsPage;
