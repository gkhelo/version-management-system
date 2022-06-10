import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "@tanstack/react-location";
import { BreadcrumbLink } from "../types/Breadcrumbs";
import { useTranslation } from "react-i18next";

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
      <Link
        underline="hover"
        key="1"
        color="inherit"
        onClick={(e) => locationChangeHandler(e, "/")}
      >
        {t("homepage")}
      </Link>
      {[
        ...links.map((link: BreadcrumbLink, index: number) => {
          return index === links.length - 1 ? (
            <Typography color="text.primary" key={link.name}>
              {link.name}
            </Typography>
          ) : (
            <Link
              underline="hover"
              key={link.name}
              onClick={(e) => locationChangeHandler(e, link.location)}
            >
              {link.name}
            </Link>
          );
        }),
      ]}
    </Breadcrumbs>
  );
};

export default VMSBreadcrumbs;
