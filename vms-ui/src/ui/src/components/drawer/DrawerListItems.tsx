import { FC } from "react";
import { useTranslation } from "react-i18next";
import List from "@mui/material/List";
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Toc as TocIcon,
  Groups as GroupsIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import ListLinkItem from "./ListLinkItem";
import { QueryKeyType } from "../../types/QueryKeyType";
import { Role } from "../../types/User";

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
        secured={[Role.ADMIN]}
      />
      <ListLinkItem
        path="/vendors"
        title={t("Vendors")}
        Icon={TocIcon}
        pageName="vendors"
        query={QueryKeyType.VENDORS}
        secured={[Role.ADMIN]}
      />
      <ListLinkItem
        path="/clients"
        title={t("Clients")}
        Icon={GroupsIcon}
        pageName="clients"
        query={QueryKeyType.CLIENTS}
        secured={[Role.ADMIN]}
      />
      <ListLinkItem
        path="/applications"
        title={t("Applications")}
        Icon={WorkIcon}
        pageName="applications"
        query={QueryKeyType.APPLICATIONS}
        secured={[Role.ADMIN, Role.USER]}
      />
      <ListLinkItem
        path="/versions"
        title={t("Versions")}
        Icon={AssignmentIcon}
        pageName="versions"
        query={QueryKeyType.VERSIONS}
        secured={[Role.ADMIN, Role.USER]}
      />
    </List>
  );
};

export default DrawerListItems;
