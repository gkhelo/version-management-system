import { FC, useEffect, useState } from "react";
import { Box, Tab, Typography } from "@mui/material";
import { Application } from "../../types/Application";
import { styled } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Groups as GroupsIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";
import useCompanyId from "../../hooks/useCompanyId";
import ApplicationForm from "./ApplicationForm";
import ApplicationUsersTab from "./ApplicationUsersTab";

const ApplicationTitle = styled(Typography)(() => ({
  marginBottom: 16,
  root: {
    color: "blue",
  },
}));

const StyledTab = styled(Tab)(() => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: 16,
}));

const ApplicationEdit: FC<{
  application: Application;
  onSubmitHandler: Function;
}> = ({ application, onSubmitHandler }) => {
  const [isVendor, setVendor] = useState<boolean>(true);
  const [companyId] = useCompanyId();
  const [currentTab, setCurrentTab] = useState<string>(isVendor ? "1" : "0");
  const tabChangeHandler = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    setVendor(companyId !== application.companyId);
  }, [companyId, application.companyId]);

  useEffect(() => {
    setCurrentTab(isVendor ? "1" : "0");
  }, [isVendor]);

  return (
    <>
      <ApplicationTitle variant="h5" color="primary">
        {application.companyName}/{application.name}
      </ApplicationTitle>
      <TabContext value={currentTab}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={tabChangeHandler}
            textColor="inherit"
            indicatorColor="secondary"
          >
            {!isVendor && (
              <StyledTab
                label="Settings"
                value="0"
                icon={<AdminPanelSettingsIcon />}
                iconPosition="start"
              />
            )}
            <StyledTab
              label="Users"
              value="1"
              icon={<GroupsIcon />}
              iconPosition="start"
            />
          </TabList>
        </Box>
        {!isVendor && (
          <TabPanel value="0">
            <ApplicationForm
              application={application}
              onSubmitHandler={onSubmitHandler}
            />
          </TabPanel>
        )}
        <TabPanel value="1">
          {application.id && (
            <ApplicationUsersTab applicationId={application.id} />
          )}
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ApplicationEdit;
