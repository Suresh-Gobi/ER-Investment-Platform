import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@mui/material";

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/project/projectadminget"
        );
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error.message);
        setError("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

  const handleViewClick = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeApprovalStatus = async (event) => {
    const { value } = event.target;
    if (!selectedProject) {
      console.error("No project selected.");
      return;
    }
  
    console.log("Selected Project ID:", selectedProject._id);
    console.log("Approval Value:", value);
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/project/projects/${selectedProject._id}/approval`,
        { projectId: selectedProject._id, approved: value === "true" }
      );
      console.log("Response data:", response.data);
      setSelectedProject((prevProject) => ({
        ...prevProject,
        landDetails: {
          ...prevProject.landDetails,
          approved: value === "true",
        },
      }));
      setOpenDialog(false); // Close the dialog after updating
    } catch (error) {
      console.error("Failed to update approval status:", error.message);
      console.error("Backend Error Response:", error.response.data.message);
    }
  };
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h1" align="center" gutterBottom>
        All Projects
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project._id} divider>
            <ListItemText
              primary={project.projectTitle}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    Category: {project.projectCategory}
                  </Typography>
                  {/* Add more secondary details as needed */}
                </>
              }
            />
            <Button variant="outlined" onClick={() => handleViewClick(project)}>
              View
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{selectedProject?.projectTitle}</DialogTitle>
        <DialogTitle>{selectedProject?._id}</DialogTitle>
        <DialogContent>
          <Typography>Category: {selectedProject?.projectCategory}</Typography>
          <Typography>
            Description: {selectedProject?.projectDescription}
          </Typography>
          <Typography>Timeline: {selectedProject?.projectTimeline}</Typography>
          <Typography>
            plantsToPlant: {selectedProject?.plantsToPlant}
          </Typography>
          <Typography>searchTags: {selectedProject?.searchTags}</Typography>
          <Typography>
            InvestmentRange: {selectedProject?.InvestmentRange}
          </Typography>
          <Typography>
            InitialInvestment: {selectedProject?.InitialInvestment}
          </Typography>
          <Typography>
            EstimatedTotal: {selectedProject?.EstimatedTotal}
          </Typography>
          <Typography>
            ExpectedRevenue: {selectedProject?.ExpectedRevenue}
          </Typography>
          {selectedProject?.landDetails && (
            <div>
              <Typography variant="h6">Land Details</Typography>
              <Typography>
                Location: {selectedProject.landDetails.landLocation}
              </Typography>
              <Typography>
                Area: {selectedProject.landDetails.landArea}
              </Typography>
              <Typography>
                projectDocument: {selectedProject.landDetails.projectDocument}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                href={selectedProject.landDetails.projectDocument}
                target="_blank"
                download
              >
                Download Document
              </Button>
              <Select
                value={selectedProject.landDetails.approved ? "true" : "false"}
                onChange={handleChangeApprovalStatus}
                fullWidth
                variant="outlined"
                label="Approval Status"
              >
                <MenuItem value="true">Approved</MenuItem>
                <MenuItem value="false">Not Approved Yet</MenuItem>
              </Select>
              <Typography>
                reference: {selectedProject.landDetails.reference}
              </Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
