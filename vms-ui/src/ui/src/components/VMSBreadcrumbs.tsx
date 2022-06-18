import { Breadcrumbs, Link, styled, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "@tanstack/react-location";
import { BreadcrumbLink } from "../types/Breadcrumbs";
import { useTranslation } from "react-i18next";

const StyledLink = styled(Link)(() => ({
  cursor: "pointer",
}));

const StyledBreadcrumbLink: React.FC<{
  children: React.ReactNode;
  onClickHandler: React.MouseEventHandler;
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

const VMSBreadcrumbs: React.FC<{ links: BreadcrumbLink[] }> = (
  { links },
  props
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const locationChangeHandler = (
    _: React.MouseEvent,
    location: string | undefined
  ) => {
    navigate({ to: location, replace: true });
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
