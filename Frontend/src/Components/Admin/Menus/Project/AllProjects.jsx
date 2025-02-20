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
  TextField, // Added TextField import
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

  const handleUpdateProjectDetails = async () => {
    if (!selectedProject) {
      console.error("No project selected.");
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/project/updateDetails/${selectedProject._id}`,
        {
          projectCategory: selectedProject.projectCategory, // Use the updated values from state
          projectDescription: selectedProject.projectDescription,
          projectTimeline: selectedProject.projectTimeline,
          plantsToPlant: selectedProject.plantsToPlant,
          searchTags: selectedProject.searchTags,
          InvestmentRange: selectedProject.InvestmentRange,
          InitialInvestment: selectedProject.InitialInvestment,
          EstimatedTotal: selectedProject.EstimatedTotal,
          ExpectedRevenue: selectedProject.ExpectedRevenue,
          landDetails: {
            landLocation: selectedProject.landDetails.landLocation,
            landArea: selectedProject.landDetails.landArea,
            projectDocument: selectedProject.landDetails.projectDocument,
            approved: selectedProject.landDetails.approved,
            reference: selectedProject.landDetails.reference,
          },
        }
      );
      console.log("Response data:", response.data);
      setSelectedProject(response.data.upload); // Update the selected project with the updated data
      setOpenDialog(false); // Close the dialog after updating
    } catch (error) {
      console.error("Failed to update project details:", error.message);
      console.error("Backend Error Response:", error.response.data.message);
    }
  };
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h6" align="center" gutterBottom>
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
          {/* Modified code starts here */}
          <Typography>
            Category:
            <TextField
              value={selectedProject?.projectCategory}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  projectCategory: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Typography>
          <Typography>
            Description:
            <TextField
              value={selectedProject?.projectDescription}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  projectDescription: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
            />
          </Typography>
          <Typography>
            Timeline:
            <TextField
              value={selectedProject?.projectTimeline}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  projectTimeline: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Typography>
          <Typography>
            plantsToPlant:
            <TextField
              value={selectedProject?.plantsToPlant}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  plantsToPlant: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Typography>
          <Typography>
            searchTags:
            <TextField
              value={selectedProject?.searchTags}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  searchTags: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Typography>
          <Typography>
            InvestmentRange:
            <TextField
              value={selectedProject?.InvestmentRange}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  InvestmentRange: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Typography>
          <Typography>
            InitialInvestment:
            <TextField
              value={selectedProject?.InitialInvestment}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  InitialInvestment: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Typography>
          <Typography>
            EstimatedTotal:
            <TextField
              value={selectedProject?.EstimatedTotal}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  EstimatedTotal: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Typography>
          <Typography>
            ExpectedRevenue:
            <TextField
              value={selectedProject?.ExpectedRevenue}
              onChange={(e) =>
                setSelectedProject((prev) => ({
                  ...prev,
                  ExpectedRevenue: e.target.value,
                }))
              }
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Typography>
          {selectedProject?.landDetails && (
            <div>
              <Typography variant="h6">Land Details</Typography>
              <Typography>
                Location:
                <TextField
                  value={selectedProject.landDetails.landLocation}
                  onChange={(e) =>
                    setSelectedProject((prev) => ({
                      ...prev,
                      landDetails: {
                        ...prev.landDetails,
                        landLocation: e.target.value,
                      },
                    }))
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Typography>
              <Typography>
                Area:
                <TextField
                  value={selectedProject.landDetails.landArea}
                  onChange={(e) =>
                    setSelectedProject((prev) => ({
                      ...prev,
                      landDetails: {
                        ...prev.landDetails,
                        landArea: e.target.value,
                      },
                    }))
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Typography>
              <Typography>
                projectDocument:
                <TextField
                  value={selectedProject.landDetails.projectDocument}
                  onChange={(e) =>
                    setSelectedProject((prev) => ({
                      ...prev,
                      landDetails: {
                        ...prev.landDetails,
                        projectDocument: e.target.value,
                      },
                    }))
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
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
                reference:
                <TextField
                  value={selectedProject.landDetails.reference}
                  onChange={(e) =>
                    setSelectedProject((prev) => ({
                      ...prev,
                      landDetails: {
                        ...prev.landDetails,
                        reference: e.target.value,
                      },
                    }))
                  }
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Typography>
            </div>
          )}

          {/* Add more fields as needed */}
          {/* Modified code ends here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          <Button color="primary" onClick={handleUpdateProjectDetails}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
