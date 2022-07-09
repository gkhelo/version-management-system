import { FC, useEffect, useState } from "react";
import usePageSelector from "../../hooks/usePageSelector";
import { useTranslation } from "react-i18next";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import { useMatch } from "@tanstack/react-location";
import VersionForm from "./VersionForm";
import { Version } from "../../types/Version";
import ServerApi from "../../api/ServerApi";
import CommentsSection from "../../components/CommentsSection";

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

  const versionSubmitHandler = async (action: string, updatedVersion: Version) => {
    if (updatedVersion) {
      updatedVersion.version = version?.version;

      const formData = new FormData();
      formData.append("version", new Blob([JSON.stringify(updatedVersion)], {
        type: "application/json"
      }));

      if (updatedVersion.files) {
        for (const file of updatedVersion.files) {
          formData.append("files", file);
        }
      }

      if (action === "add") {
        setVersion(await ServerApi.addVersion(formData));
      } else {
        setVersion(await ServerApi.updateVersion(formData));
      }
    }
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
          { name:
              action == "add"
                ? t("addVersion")
                : t("editVersion")
          },
        ]}
      />
      {
        action === "add" ?
          <VersionForm action={action} version={null} onSubmitHandler={versionSubmitHandler}/>
          :
          version && <VersionForm action={action} version={version} onSubmitHandler={versionSubmitHandler}/>
      }

      { version && version.id && <CommentsSection versionId={version.id} /> }
    </>
  );
};

export default VersionPage;
