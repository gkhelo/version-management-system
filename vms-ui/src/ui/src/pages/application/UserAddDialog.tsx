import { ChangeEvent, FC, useState } from "react";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import {
  DialogActions,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  Contacts as ContactsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import SimpleButton from "../../components/SimpleButton";
import {
  BootstrapDialog,
  BootstrapDialogContent,
  BootstrapDialogTitle,
} from "../../components/BootstrapDialog";
import ServerApi from "../../api/ServerApi";
import { User } from "../../types/User";
import UserListItem from "../../components/UserListItem";

const LargeContactsIcon = styled(ContactsIcon)(() => ({
  width: 30,
  height: 30,
}));

const USERS_ON_PAGE = 5;

const UserAddDialog: FC<{
  open: boolean;
  setOpen: Function;
  onSubmit: Function;
  applicationId: number;
}> = ({ open, setOpen, onSubmit, applicationId }) => {
  const [users, setUsers] = useState<User[]>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { t } = useTranslation();
  const handleClose = () => {
    onSubmit(selectedUser?.id);
    setSelectedUser(null);
    setUsers([]);
    setOpen(false);
  };

  const searchUsers = debounce(async (input: string) => {
    const data = await ServerApi.searchUsers(
      input,
      applicationId,
      USERS_ON_PAGE
    );
    setUsers(data);
  }, 1000);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value;
    if (input.length >= 3) {
      searchUsers(input);
    } else {
      setUsers([]);
    }
  };

  return (
    <BootstrapDialog open={open} onClose={handleClose}>
      <BootstrapDialogTitle onClose={handleClose} />
      <BootstrapDialogContent>
        <LargeContactsIcon />
        <Typography gutterBottom variant="body2" sx={{ m: 1 }}>
          {t("addUser")}
        </Typography>
        {selectedUser ? (
          <UserListItem
            user={selectedUser}
            removable={true}
            onRemove={() => {
              setSelectedUser(null);
            }}
          />
        ) : (
          <>
            <TextField
              label={"Users"}
              fullWidth
              size="small"
              sx={{ mb: 1 }}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder={"Search for user"}
            />
            {users && [
              ...users.map((user: User) => (
                <UserListItem
                  user={user}
                  key={user.id}
                  removable={false}
                  onClick={() => setSelectedUser(user)}
                />
              )),
            ]}
          </>
        )}
      </BootstrapDialogContent>
      <DialogActions>
        <SimpleButton
          autoFocus
          onClick={handleClose}
          variant="contained"
          color="success"
          fullWidth
          size="small"
        >
          {t("save")}
        </SimpleButton>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default UserAddDialog;
