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
  TextField,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AllProjects() {
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [initialInvestment, setInitialInvestment] = useState(500);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);
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

  useEffect(() => {
    // Filter projects based on search query whenever it changes
    const filtered = allProjects.filter((project) =>
      project.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProjects(filtered);
  }, [searchQuery, allProjects]);

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
    navigate(`/chat/${project.user._id}`);
  };

  return (
    <div>
      <h1>Paid on-going Projects</h1>
      <TextField
        label="Search by title"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Grid container spacing={2}>
        {allProjects.length > 0 ? (
          allProjects
            .filter((project) => project.projectStatus === "Started")
            .map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {project.projectTitle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {project.projectDescription}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Pending Payment: $
                      {parseInt(project.EstimatedTotal) -
                        parseInt(project.paidAmount)}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => handleViewProject(project)}
                    >
                      View
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

      <Container>
        <Card>
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="xl"
            fullWidth
          >
            {selectedProject && (
              <>
                <DialogTitle>{selectedProject.projectTitle}</DialogTitle>
                <DialogContent>
                  <DialogContent dividers>
                    {selectedProject && (
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="body1">
                            Project ID: {selectedProject._id}
                          </Typography>
                          <Typography variant="body1">
                            Project Title: {selectedProject.projectTitle}
                          </Typography>
                          <Typography variant="body1">
                            Project Category: {selectedProject.projectCategory}
                          </Typography>
                          <Typography variant="body1">
                            Project Description:{" "}
                            {selectedProject.projectDescription}
                          </Typography>
                          <Typography variant="body1">
                            Project TimeLine: {selectedProject.projectTimeline}
                          </Typography>
                          {/* Add more project details as needed */}
                        </CardContent>
                      </Card>
                    )}
                  </DialogContent>

                  <Card variant="outlined">
                    <CardContent>
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
                        Estimated Total Cost: {selectedProject.paidAmount}
                      </Typography>
                      <Typography variant="body1">
                        Expected Revenue: {selectedProject.ExpectedRevenue}
                      </Typography>
                      <Typography variant="body1">
                        Land Location:{" "}
                        {selectedProject.landDetails.landLocation}
                      </Typography>
                      <Typography variant="body1">
                        Land Area: {selectedProject.landDetails.landArea}
                      </Typography>
                      <Typography variant="body1">
                        Project Document:{" "}
                        {selectedProject.landDetails.projectDocument && (
                          <a
                            href={selectedProject.landDetails.projectDocument}
                            download
                            style={{ textDecoration: "none" }}
                          >
                            <Button variant="outlined" color="primary">
                              Download Document
                            </Button>
                          </a>
                        )}
                      </Typography>

                      {/* Include User ID */}
                      <Typography variant="body1">
                        User ID:{" "}
                        {selectedProject.user
                          ? selectedProject.user._id
                          : "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Add more project details as needed */}
                  {/* Render the Chat component */}
                  <br />
                  <br />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDialog}>Close</Button>
                  {/* <Button
                variant="contained"
                color="primary"
                onClick={() => handleStartProject(selectedProject)}
              >
                Start the Project
              </Button> */}
                </DialogActions>
              </>
            )}
          </Dialog>
        </Card>
      </Container>
    </div>
  );
}
