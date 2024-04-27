import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import Chat from "../../ChatInvestor";
import PaymentForm from "../../../Payment/PaymentForm";

export default function AllProjects() {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [initialInvestment, setInitialInvestment] = useState(500);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/project/projectadminget"
        );
        const projects = response.data.projects;
        setAllProjects(projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error.message);
      }
    };

    fetchAllProjects();
  }, []);

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleStartProject = (project) => {
    console.log("Selected Project:", project);
    if (project && project.InvestmentRange) {
      setInitialInvestment(project.InvestmentRange);
      setSelectedProject(project);
      setOpenDialog(true);
    } else {
      console.error("Selected project or InvestmentRange is not defined.");
    }
  };

  const handleChatNow = (project) => {
    // Navigate to /chat and pass selectedProject.user._id as a query parameter
    navigate(`/chat/${project.user._id}`);
  };

  return (
    <div>
      <h1>All Projects</h1>
      <Grid container spacing={2}>
        {allProjects.length > 0 ? (
          allProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {project.projectTitle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {project.projectDescription}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewProject(project)}
                  >
                    View
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleChatNow(project)}
                  >
                    Chat Now with Activist
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">
              No projects found.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.projectTitle}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Project Id: {selectedProject._id}
              </Typography>
              <Typography variant="body1">
                Project Category: {selectedProject.projectCategory}
              </Typography>
              <Typography variant="body1">
                Project Description: {selectedProject.projectDescription}
              </Typography>
              <Typography variant="body1">
                Project TimeLine: {selectedProject.projectTimeline}
              </Typography>
              <Typography variant="body1">
                Plant: {selectedProject.plantsToPlant}
              </Typography>
              <Typography variant="body1">
                Investment Range: {selectedProject.InvestmentRange}
              </Typography>
              <Typography variant="body1">
                Estimated Total Cost: {selectedProject.EstimatedTotal}
              </Typography>
              <Typography variant="body1">
                Expected Revenue: {selectedProject.ExpectedRevenue}
              </Typography>
              <Typography variant="body1">
                Land Location: {selectedProject.landDetails.landLocation}
              </Typography>
              <Typography variant="body1">
                Land Area: {selectedProject.landDetails.landArea}
              </Typography>
              <Typography variant="body1">
                Project Document: {selectedProject.landDetails.projectDocument}
              </Typography>
              <Typography variant="body1">
                Approval: {selectedProject.approved}
              </Typography>
              {/* Include User ID */}
              <Typography variant="body1">
                User ID:{" "}
                {selectedProject.user ? selectedProject.user._id : "N/A"}
              </Typography>
              {/* Add more project details as needed */}
              {/* Render the Chat component */}
              {selectedProject && <Chat resId={selectedProject.user._id} />}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleStartProject(selectedProject)}
              >
                Start the Project
              </Button>
              {selectedProject && (
                <PaymentForm
                  initialInvestment={initialInvestment}
                  projectTitle={selectedProject.projectTitle}
                  projectUserId={selectedProject.user._id}
                  // projectId={selectedProject._id}
                />
              )}
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
