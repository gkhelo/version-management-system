import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Chip } from "@mui/material";
import {
  Done as DoneIcon,
  Close as CloseIcon,
  Pause as PauseIcon,
  HourglassTop as HourglassTopIcon,
  HourglassBottom as HourglassBottomIcon,
} from "@mui/icons-material";
import { VersionStatus } from "../../types/Version";

const VersionStatusChip: FC<{ status: VersionStatus }> = ({ status }) => {
  const { t } = useTranslation();

  switch (status) {
    case VersionStatus.ACTIVE:
      return (
        <Chip
          icon={<DoneIcon />}
          label={t("active")}
          color="success"
          variant="outlined"
          sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-start" }}
        />
      );
    case VersionStatus.PENDING:
      return (
        <Chip
          icon={<HourglassTopIcon />}
          label={t("pending")}
          color="primary"
          variant="outlined"
          sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-start" }}
        />
      );
    case VersionStatus.REJECTED:
      return (
        <Chip
          icon={<CloseIcon />}
          label={t("rejected")}
          color="error"
          variant="outlined"
          sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-start" }}
        />
      );
    case VersionStatus.STOPPED:
      return (
        <Chip
          icon={<PauseIcon />}
          label={t("stopped")}
          color="warning"
          variant="outlined"
          sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-start" }}
        />
      );
    default:
      return (
        <Chip
          icon={<HourglassBottomIcon />}
          label={t("expired")}
          variant="outlined"
          sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-start" }}
        />
      );
  }
};

export default VersionStatusChip;
