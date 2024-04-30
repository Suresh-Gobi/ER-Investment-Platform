import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

export default function MyProject() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/project/projectget",
          config
        );

        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const calculatePendingBalance = (project) => {
    const estimatedTotal = parseFloat(project?.EstimatedTotal) || 0;
    const paidAmount = parseFloat(project?.paidAmount) || 0;
    return estimatedTotal - paidAmount;
  };

  return (
    <div>
      <br />
      <h1>My Projects</h1>
      <br />
      <Grid container spacing={3}>
        {projects
          .filter((project) => project.projectStatus === "Started")
          .map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Card fullWidth>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {project.projectTitle}
                  </Typography>
                  <Typography color="textSecondary">
                    {project.projectCategory}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewProject(project)}
                  >
                    View Project
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedProject?.projectTitle}</DialogTitle>
        <DialogContent>
          <Typography>{selectedProject?.projectDescription}</Typography>
          <Typography>{selectedProject?.projectTimeline}</Typography>
          <Typography>{selectedProject?.plantsToPlant}</Typography>
          <Typography>{selectedProject?.searchTags}</Typography>
          <Typography>{selectedProject?.InvestmentRange}</Typography>

          <Typography>{selectedProject?.InitialInvestment}</Typography>
          <Typography>
            Estimated Total Investment Amount : {selectedProject?.EstimatedTotal}
          </Typography>
          <Typography>{selectedProject?.ExpectedRevenue}</Typography>
          <Typography>{selectedProject?.landDetails.landLocation}</Typography>

          <Typography>{selectedProject?.landDetails.landArea}</Typography>
          <Typography>
            <Button
              component="a"
              href={selectedProject?.landDetails.projectDocument}
              target="_blank"
              download
            >
              Download Document
            </Button>
          </Typography>

          <Typography gutterBottom variant="h6">
            Project Status Details
          </Typography>
          <Typography>
            Project Status: {selectedProject?.projectStatus}
          </Typography>
          <Typography>Paid Amount: {selectedProject?.paidAmount}</Typography>
          <Typography>Investor ID: {selectedProject?.investorId}</Typography>
          <Typography>Start Date: {selectedProject?.startDate}</Typography>
          <Typography>End Date: {selectedProject?.endDate}</Typography>
          <Typography>Duration: {selectedProject?.duration}</Typography>
          <Typography>Milestone: {selectedProject?.mileston}</Typography>
          <Typography>
            Pending Balance to Pay: {calculatePendingBalance(selectedProject)}
          </Typography>

          <Typography>{selectedProject?.landDetails.approved}</Typography>

          {/* Add more project details here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
