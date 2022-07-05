import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, InputAdornment, List, TextField } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Context as SnackbarContext } from "../../context/SnackbarContext";
import UserListItem from "../../components/UserListItem";
import ServerApi from "../../api/ServerApi";
import { User } from "../../types/User";
import FormButtonWrapper from "../../components/FormButtonWrapper";
import SimpleButton from "../../components/SimpleButton";
import UserAddDialog from "./UserAddDialog";
import { Severity } from "../../types/SnackbarMessage";

const USERS_ON_PAGE = 5;

const ApplicationUsersTab: FC<{ applicationId: number }> = ({
  applicationId,
}) => {
  const { t } = useTranslation();
  const [applicationUsers, setApplicationUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);
  const { setSnackbarMessage } = useContext(SnackbarContext);

  const fetchApplicationUsers = async (applicationId: number) => {
    const users = await ServerApi.getApplicationUsers(applicationId);
    setApplicationUsers(users);
    setFilteredUsers(users);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input: string = e.target.value.toLowerCase();
    setFilteredUsers(
      applicationUsers.filter((user) => {
        const fullname: string =
          `${user.firstname} ${user.lastname}`.toLowerCase();
        return (
          user.email?.toLowerCase().includes(input) ||
          user.username?.toLowerCase().includes(input) ||
          fullname.includes(input)
        );
      })
    );
  };

  useEffect(() => {
    fetchApplicationUsers(applicationId);
  }, [applicationId]);

  const handleUserRemove = async (userId: number | undefined) => {
    userId &&
      (await ServerApi.deleteApplicationUser(applicationId, userId).then(
        (data) => {
          setSnackbarMessage({
            message: "Successfully removed user",
            status: 200,
            severity: Severity.SUCCESS,
          });
          return data;
        }
      ));
    fetchApplicationUsers(applicationId);
  };

  const handleUserAdd = async (userId: number | undefined) => {
    userId &&
      (await ServerApi.addApplicationUser(applicationId, userId).then(
        (data) => {
          setSnackbarMessage({
            message: "Successfully added user",
            status: 200,
            severity: Severity.SUCCESS,
          });
          return data;
        }
      ));
    fetchApplicationUsers(applicationId);
  };

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  return (
    <Container maxWidth="sm">
      <UserAddDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSubmit={handleUserAdd}
        applicationId={applicationId}
      />
      <FormButtonWrapper>
        <SimpleButton
          size="small"
          color="success"
          variant="contained"
          disableElevation
          startIcon={<AddIcon />}
          sx={{ mb: 1 }}
          onClick={() => setDialogOpen(true)}
        >
          {t("Add User")}
        </SimpleButton>
      </FormButtonWrapper>
      <TextField
        label={t("Users")}
        fullWidth
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder={"Search for application user"}
      />
      <List>
        {filteredUsers && [
          ...filteredUsers.map((user: User) => (
            <UserListItem
              user={user}
              key={user.id}
              onRemove={() => handleUserRemove(user.id)}
            />
          )),
        ]}
      </List>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SimpleButton
          disabled={page === 0}
          startIcon={<ChevronLeftIcon />}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </SimpleButton>
        <SimpleButton
          disabled={(page + 1) * USERS_ON_PAGE >= applicationUsers.length}
          endIcon={<ChevronRightIcon />}
          onClick={() => setPage(page + 1)}
        >
          Next
        </SimpleButton>
      </div>
    </Container>
  );
};

export default ApplicationUsersTab;
