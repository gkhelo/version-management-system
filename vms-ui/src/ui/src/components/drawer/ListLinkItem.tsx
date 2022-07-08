import { ElementType, FC, useContext, useEffect } from "react";
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
import usePermissions from "../../hooks/usePermissions";
import { QueryKeyType } from "../../types/QueryKeyType";
import { Role } from "../../types/User";

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
  secured = [],
}) => {
  const {
    state: { currentPage },
  } = useContext(Context);
  const { hasPermission } = usePermissions();
  const classes = useStyles();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const NavigationHandler = (): void => {
    navigate({ to: path });
    query && queryClient.invalidateQueries(query);
  };

  useEffect(() => {
    !hasPermission(secured) && navigate({ to: "/" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hasPermission(secured) ? (
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
  ) : (
    <></>
  );
};

type ListLinkItemType = {
  title: string;
  path: string;
  Icon: ElementType;
  pageName: string;
  query?: QueryKeyType;
  secured?: Role[];
};

export default ListLinkItem;
