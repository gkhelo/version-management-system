import { FC, useState } from "react";
import { Box, Tab, Typography } from "@mui/material";
import { Application } from "../../types/Application";
import { styled } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Groups as GroupsIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from "@mui/icons-material";
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
  const [currentTab, setCurrentTab] = useState<string>("0");
  const tabChangeHandler = (_: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
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
            <StyledTab
              label="Settings"
              value="0"
              icon={<AdminPanelSettingsIcon />}
              iconPosition="start"
            />
            <StyledTab
              label="Users"
              value="1"
              icon={<GroupsIcon />}
              iconPosition="start"
            />
          </TabList>
        </Box>
        <TabPanel value="0">
          <ApplicationForm
            application={application}
            onSubmitHandler={onSubmitHandler}
          />
        </TabPanel>
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
