import { useMatch } from "@tanstack/react-location";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ServerApi from "../../api/ServerApi";
import VMSBreadcrumbs from "../../components/VMSBreadcrumbs";
import usePageSelector from "../../hooks/usePageSelector";
import { User } from "../../types/User";

const UserPage = () => {
  usePageSelector("users");
  const { t } = useTranslation();
  const {
    params: { userId },
  } = useMatch();

  const fetchUser = async (userId: number | string) => {
    const fetchedUser = await ServerApi.getUser(userId);
    setUser(fetchedUser);
  };

  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
  return (
    <>
      <VMSBreadcrumbs
        links={[
          { location: "/users", name: t("Users") },
          { name: t("editUser") },
        ]}
      />
      {user &&
        Object.keys(user).map((key: string) => (
          <h4 key={key}>{`${key} - ${user[key as keyof User]}`}</h4>
        ))}
    </>
  );
};

export default UserPage;
