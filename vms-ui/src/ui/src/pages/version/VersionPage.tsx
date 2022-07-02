import { FC, useEffect, useState } from "react";
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

  const fetchVersion = async (versionId: number | string) => {
    const fetchedVersion = await ServerApi.getVersion(versionId);
    setVersion(fetchedVersion);
  };

  const versionSubmitHandler = async (version: Version) => {
    await ServerApi.addVersion(version);
  };

  const [version, setVersion] = useState<Version>();

  useEffect(() => {
    if (action !== "add") {
      fetchVersion(versionId)
        .catch(err => {
          console.error("Version fetch error", err);
        });
    }
  }, [versionId]);

  return (
    <>
      <VMSBreadcrumbs
        links={[
          { location: "/versions", name: t("Versions") },
          { name: t("Versions") },
        ]}
      />
      {
        action === "add" ?
          <VersionForm action={action} version={null} onSubmitHandler={versionSubmitHandler}/>
          :
          version && <VersionForm action={action} version={version} onSubmitHandler={versionSubmitHandler}/>
      }
    </>
  );
};

export default VersionPage;
