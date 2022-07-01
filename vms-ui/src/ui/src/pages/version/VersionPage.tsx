import { FC } from "react";
import usePageSelector from "../../hooks/usePageSelector";
import { useTranslation } from "react-i18next";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import { useMatch } from "@tanstack/react-location";
import VersionForm from "./VersionForm";
import { Version } from "../../types/Version";
import ServerApi from "../../api/ServerApi";

const VersionPage: FC = () => {
  usePageSelector("versions");
  const { t } = useTranslation();
  const {
    params: { action, versionId },
  } = useMatch();

  const versionSubmitHandler = async (version: Version) => {
    await ServerApi.addVersion(version);
  };

  return (
    <>
      <VMSBreadcrumbs
        links={[
          { location: "/versions", name: t("Versions") },
          { name: t("Versions") },
        ]}
      />
      {
        <VersionForm onSubmitHandler={versionSubmitHandler} />
      }
    </>
  );
};

export default VersionPage;
