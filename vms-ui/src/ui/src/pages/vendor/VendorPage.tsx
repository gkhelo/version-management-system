import { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import { Container, Paper } from "@mui/material";
import usePageSelector from "../../hooks/usePageSelector";
import VendorForm from "./VendorForm";
import useVendors from "../../hooks/useVendors";
import ServerApi from "../../api/ServerApi";
import { Context as SnackbarContext } from "../../context/SnackbarContext";
import { Severity } from "../../types/SnackbarMessage";
import { useNavigate } from "@tanstack/react-location";

const VendorPage: FC = () => {
  usePageSelector("vendors");
  const { t } = useTranslation();
  const { setSnackbarMessage } = useContext(SnackbarContext);
  const navigate = useNavigate();
  const vendors = useVendors();

  const vendorSubmitHandler = async (vendorId: number) => {
    await ServerApi.addVendor(vendorId).then((data) => {
      setSnackbarMessage({
        message: "addedVendorSuccessfully",
        status: 200,
        severity: Severity.SUCCESS,
      });
      return data;
    })
    navigate({ to: "/vendors" });
  };

  return (
    <>
      <VMSBreadcrumbs
        links={[
          { location: "/vendors", name: t("Vendors") },
          { name: t("addVendor") },
        ]}
      />
      <Container
        maxWidth={false}
        disableGutters
        sx={{ mr: "auto", ml: "auto" }}
      >
        <Paper variant="outlined" sx={{ p: 2, m: 0 }}>
          {
            <VendorForm
              usedVendors={ vendors.data ? vendors.data.map(x => x.id) : [] }
              onSubmitHandler={vendorSubmitHandler}
            />
          }
        </Paper>
      </Container>
    </>
  );
};

export default VendorPage;
