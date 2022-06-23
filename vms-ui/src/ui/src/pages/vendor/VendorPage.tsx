import { FC } from "react";
import { useTranslation } from "react-i18next";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import usePageSelector from "../../hooks/usePageSelector";
import VendorForm from "./VendorForm";
import useVendors from "../../hooks/useVendors";
import ServerApi from "../../api/ServerApi";

const VendorPage: FC = () => {
  usePageSelector("vendors");
  const { t } = useTranslation();
  const vendors = useVendors();

  const vendorSubmitHandler = async (vendorId: number) => {
    await ServerApi.addVendor(vendorId);
  };

  return (
    <>
      <VMSBreadcrumbs
        links={[
          { location: "/vendors", name: t("Vendors") },
          { name: t("addVendor") },
        ]}
      />
      {
        <VendorForm
          usedVendors={
            vendors.data ? vendors.data.map(x => x.id) : []
          }
          onSubmitHandler={vendorSubmitHandler}
        />
      }
    </>
  );
};

export default VendorPage;
