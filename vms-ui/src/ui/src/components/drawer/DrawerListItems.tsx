import List from "@mui/material/List";
import ListLinkItem from "./ListLinkItem";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import { useTranslation } from "react-i18next";
import { QueryKeyType } from "../../types/QueryKeyType";

const DrawerListItems: React.FC = () => {
  const { t } = useTranslation();
  return (
    <List>
      <ListLinkItem
        path="/users"
        title={t("Users")}
        Icon={PersonIcon}
        pageName="users"
        query={QueryKeyType.USERS}
      />
      <ListLinkItem
        path="/applications"
        title={t("Applications")}
        Icon={WorkIcon}
        pageName="applications"
        query={QueryKeyType.APPLICATIONS}
      />
    </List>
  );
};

export default DrawerListItems;
