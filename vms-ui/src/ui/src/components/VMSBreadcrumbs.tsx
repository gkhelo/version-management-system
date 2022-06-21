import { FC, MouseEvent, MouseEventHandler, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@tanstack/react-location";
import { Breadcrumbs, Link, styled, Typography } from "@mui/material";
import { BreadcrumbLink } from "../types/Breadcrumbs";

const StyledLink = styled(Link)(() => ({
  cursor: "pointer",
}));

const StyledBreadcrumbLink: FC<{
  children: ReactNode;
  onClickHandler: MouseEventHandler;
}> = ({ children, onClickHandler }, props) => {
  return (
    <StyledLink
      underline="hover"
      color="inherit"
      onClick={(e) => onClickHandler(e)}
      {...props}
    >
      {children}
    </StyledLink>
  );
};

const VMSBreadcrumbs: FC<{ links: BreadcrumbLink[] }> = ({ links }, props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locationChangeHandler = (
    _: MouseEvent,
    location: string | undefined
  ) => {
    navigate({ to: location });
  };
  return (
    <Breadcrumbs color="primary" sx={{ marginBottom: 1 }} {...props}>
      <StyledBreadcrumbLink
        onClickHandler={(e) => locationChangeHandler(e, "/")}
      >
        {t("homepage")}
      </StyledBreadcrumbLink>
      {[
        ...links.map((link: BreadcrumbLink, index: number) => {
          return index === links.length - 1 ? (
            <Typography color="text.primary" key={link.name}>
              {link.name}
            </Typography>
          ) : (
            <StyledBreadcrumbLink
              key={link.name}
              onClickHandler={(e) => locationChangeHandler(e, link.location)}
            >
              {link.name}
            </StyledBreadcrumbLink>
          );
        }),
      ]}
    </Breadcrumbs>
  );
};

export default VMSBreadcrumbs;
