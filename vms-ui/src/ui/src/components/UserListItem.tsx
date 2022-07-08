import { FC, MouseEvent } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import { PersonRemove as PersonRemoveIcon } from "@mui/icons-material";
import { User } from "../types/User";

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name[0]?.toLocaleUpperCase(),
  };
};

const StyledListItem = styled(ListItem)(() => ({
  "&:hover": {
    backgroundColor: "rgb(7, 177, 77, 0.42)",
  },
  cursor: "pointer",
}));

const UserListItem: FC<UserListItemProps> = ({
  user,
  removable = true,
  onRemove,
  ...rest
}) => {
  return (
    <StyledListItem
      secondaryAction={
        removable && (
          <IconButton
            edge="end"
            aria-label="delete"
            color="error"
            onClick={onRemove}
          >
            <PersonRemoveIcon />
          </IconButton>
        )
      }
      {...rest}
    >
      <ListItemAvatar>
        {user.username && <Avatar {...stringAvatar(user.username)} />}
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={user.firstname + " " + user.lastname}
      />
    </StyledListItem>
  );
};

type UserListItemProps = {
  user: User;
  removable?: boolean;
  onRemove?: (event: MouseEvent) => void;
  [rest: string]: any;
};

export default UserListItem;
