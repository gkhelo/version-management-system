import { FC, useEffect, useState } from "react";
import { useMatch } from "@tanstack/react-location";
import { useTranslation } from "react-i18next";
import ServerApi from "../../api/ServerApi";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import usePageSelector from "../../hooks/usePageSelector";
import UserForm from "./UserForm";
import { User } from "../../types/User";

const UserPage: FC = () => {
  usePageSelector("users");
  const { t } = useTranslation();
  const {
    params: { userId },
  } = useMatch();

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
      ? await ServerApi.addUser(user)
      : await ServerApi.updateUser(user);
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
