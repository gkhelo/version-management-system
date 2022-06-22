import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import VMSDatagrid from "../../components/VMSDatagrid";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import usePageSelector from "../../hooks/usePageSelector";
import useVendors from "../../hooks/useVendors";
import { useNavigate } from "@tanstack/react-location";

const VendorsPage: FC = () => {
  usePageSelector("vendors");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const vendorData = useVendors();

  const navigateToVendor = () => {
    navigate({ to: `/vendors/add` });
  };

  return (
    <>
      <VMSBreadcrumbs links={[{ location: "/vendors", name: t("Vendors") }]}/>

      {vendorData.isError ? (
        <h3>{vendorData.error.message}</h3>
      ) : (
        vendorData.data && (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon/>}
              size="small"
              sx={{ marginBottom: 0.5 }}
              onClick={navigateToVendor}
            >
              {t("addVendor")}
            </Button>
            <VMSDatagrid
              columns={[
                { field: "id", headerName: "ID", flex: 0.5 },
                { field: "name", headerName: t("name"), flex: 2 },
                { field: "email", headerName: t("email"), flex: 2 },
              ]}
              rows={vendorData.data}
              paginationMode="client"
            />
          </>
        )
      )}
    </>
  );
}

export default VendorsPage;
