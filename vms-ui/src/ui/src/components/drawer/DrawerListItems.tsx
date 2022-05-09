import List from "@mui/material/List";
import ListLinkItem from "./ListLinkItem";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from '@mui/icons-material/Work';

const DrawerListItems: React.FC = () => {
  return (
    <List>
      <ListLinkItem
        path="/clients"
        title="მომხმარებლები"
        Icon={PersonIcon}
        pageName="clients"
        query="query-clients"
      />
      <ListLinkItem
        path="/applications"
        title="აპლიკაციები"
        Icon={WorkIcon}
        pageName="applications"
        query="query-applications"
      />
    </List>
  );
};

export default DrawerListItems;
