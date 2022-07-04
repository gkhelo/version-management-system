import { FC } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
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

const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name[0]?.toLocaleUpperCase(),
  };
};

const UserListItem: FC<User> = (user) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" color="error">
          <PersonRemoveIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        {user.username && <Avatar {...stringAvatar(user.username)} />}
      </ListItemAvatar>
      <ListItemText
        primary={user.username}
        secondary={user.firstname + " " + user.lastname}
      />
    </ListItem>
  );
};

export default UserListItem;
