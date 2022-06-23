import { FC } from "react";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Toc as TocIcon,
  Groups as GroupsIcon,
} from "@mui/icons-material";
import ListLinkItem from "./ListLinkItem";
import { QueryKeyType } from "../../types/QueryKeyType";

const DrawerListItems: FC = () => {
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
        path="/vendors"
        title={t("Vendors")}
        Icon={TocIcon}
        pageName="vendors"
        query={QueryKeyType.VENDORS}
      />
      <ListLinkItem
        path="/clients"
        title={t("clients")}
        Icon={GroupsIcon}
        pageName="clients"
        query={QueryKeyType.CLIENTS}
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
