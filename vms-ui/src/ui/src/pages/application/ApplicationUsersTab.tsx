import { ChangeEvent, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import {
  Button,
  Container,
  InputAdornment,
  List,
  TextField,
} from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import UserListItem from "../../components/UserListItem";
import ServerApi from "../../api/ServerApi";
import { User } from "../../types/User";

const USERS_ON_PAGE = 5;
const PageButton = styled(Button)(() => ({
  textTransform: "none",
}));

const ApplicationUsersTab: FC<{ applicationId: number }> = ({
  applicationId,
}) => {
  const { t } = useTranslation();
  const [applicationUsers, setApplicationUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(0);

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

  return (
    <Container maxWidth="sm">
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
            <UserListItem {...user} key={user.id} />
          )),
        ]}
      </List>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PageButton
          disabled={page === 0}
          startIcon={<ChevronLeftIcon />}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </PageButton>
        <PageButton
          disabled={(page + 1) * USERS_ON_PAGE >= applicationUsers.length}
          endIcon={<ChevronRightIcon />}
          onClick={() => setPage(page + 1)}
        >
          Next
        </PageButton>
      </div>
    </Container>
  );
};

export default ApplicationUsersTab;
