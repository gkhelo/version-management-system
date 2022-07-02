import { FC, useContext, useEffect, useState } from "react";
import { useMatch, useNavigate } from "@tanstack/react-location";
import { useTranslation } from "react-i18next";
import ServerApi from "../../api/ServerApi";
import { Context as SnackbarContext } from "../../context/SnackbarContext";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import usePageSelector from "../../hooks/usePageSelector";
import UserForm from "./UserForm";
import { User } from "../../types/User";
import { Severity } from "../../types/SnackbarMessage";

const UserPage: FC = () => {
  usePageSelector("users");
  const { t } = useTranslation();
  const {
    params: { userId },
  } = useMatch();
  const navigate = useNavigate();
  const { setSnackbarMessage } = useContext(SnackbarContext);

  const fetchUser = async (userId: number | string) => {
    const fetchedUser = await ServerApi.getUser(userId);
    setUser(fetchedUser);
  };

  const createNewUser = async () => {
    setUser({
      id: 0,
      username: null,
      firstname: null,
      lastname: null,
      password: "",
      confirmPassword: "",
      email: null,
      role: null,
    });
  };

  const userSubmitHandler = async (user: User) => {
    userId === "new"
      ? await ServerApi.addUser(user).then((data) => {
          setSnackbarMessage({
            message: "Successfully added user",
            status: 200,
            severity: Severity.SUCCESS,
          });
          return data;
        })
      : await ServerApi.updateUser(user).then((data) => {
          setSnackbarMessage({
            message: "Successfully updated user",
            status: 200,
            severity: Severity.SUCCESS,
          });
          return data;
        });
    navigate({ to: "/users" });
  };

  const [user, setUser] = useState<User>();

  useEffect(() => {
    userId === "new" ? createNewUser() : fetchUser(userId);
  }, [userId]);
  return (
    <>
      <VMSBreadcrumbs
        links={[
          { location: "/users", name: t("Users") },
          { name: userId === "new" ? t("addUser") : t("editUser") },
        ]}
      />
      {user && <UserForm user={user} onSubmitHandler={userSubmitHandler} />}
    </>
  );
};

export default UserPage;
