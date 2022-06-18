import { useContext } from "react";
import { useNavigate } from "@tanstack/react-location";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ListItemButton, Tooltip } from "@mui/material";
import { Context } from "../../context/AppContext";
import { makeStyles } from "@mui/styles";
import { useQueryClient } from "react-query";
import { QueryKeyType } from "../../types/QueryKeyType";

const useStyles = makeStyles(() => ({
  selected: {
    color: "#3f51b5",
  },
}));

const ListLinkItem: React.FC<ListLinkItemType> = ({
  title,
  path,
  Icon,
  pageName,
  query,
}) => {
  const {
    state: { currentPage },
  } = useContext(Context);
  const classes = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const NavigationHandler = (): void => {
    navigate({ to: path });
    query && queryClient.invalidateQueries(query);
  };

  return (
    <ListItemButton onClick={NavigationHandler}>
      <ListItemIcon>
        <Tooltip title={title} placement="right">
          <Icon color={currentPage === pageName ? "primary" : "action"} />
        </Tooltip>
      </ListItemIcon>
      <ListItemText
        primary={title}
        classes={currentPage === title ? { primary: classes.selected } : {}}
      />
    </ListItemButton>
  );
};

type ListLinkItemType = {
  title: string;
  path: string;
  Icon: React.ElementType;
  pageName: string;
  query?: QueryKeyType;
};

export default ListLinkItem;
