import React, { useState } from "react";
import { Tabs, Tab, Typography, Box, Container } from "@mui/material";
import AllProjects from "./Project/AllProjects";
import ApprovedProjects from "./Project/ApprovedProjects";
import PendingProjects from "./Project/PendingProjects";

export default function Projects() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container maxWidth="md" style={{marginRight: '150vh'}}>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="All Projects" />
        <Tab label="Approved Projects" />
        <Tab label="Pending Approval Projects" />
      </Tabs>
      <Box mt={2}>
        {selectedTab === 0 && (
          <Typography component="div">
            <AllProjects />
          </Typography>
        )}
        {selectedTab === 1 && (
          <Typography component="div">
            <ApprovedProjects />
          </Typography>
        )}
        {selectedTab === 2 && (
          <Typography component="div">
            <PendingProjects />
          </Typography>
        )}
      </Box>
    </Container>
  );
}
