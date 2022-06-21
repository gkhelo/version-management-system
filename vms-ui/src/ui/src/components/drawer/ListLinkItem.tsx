import { ElementType, FC, useContext } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "@tanstack/react-location";
import { makeStyles } from "@mui/styles";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { Context } from "../../context/AppContext";
import { QueryKeyType } from "../../types/QueryKeyType";

const useStyles = makeStyles(() => ({
  selected: {
    color: "#3f51b5",
  },
}));

const ListLinkItem: FC<ListLinkItemType> = ({
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
  Icon: ElementType;
  pageName: string;
  query?: QueryKeyType;
};

export default ListLinkItem;
