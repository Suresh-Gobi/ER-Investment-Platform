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
  Chip,
} from "@mui/material";
import ReactSpeedometer from "react-d3-speedometer/slim";
import PaymentForm from "../../../Payment/PaymentForm";

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
          "http://localhost:5000/api/project/projectgetinvestor",
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

  return (
    <div>
      <h1>On-Going Projects</h1>
      <Grid container spacing={3}>
        {projects
          .filter((project) => project.projectStatus === "Started")
          .map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {project.projectTitle}
                  </Typography>
                  <Typography color="textSecondary">
                    {project.projectCategory}
                  </Typography>
                  <Typography variant="body2" component="p">
                    <Chip label={project.projectStatus} />
                  </Typography>
                  <Typography variant="body2" component="p">
                    Pending Amount to Pay: LKR
                    {project.EstimatedTotal - project.paidAmount}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewProject(project)}
                  >
                    View Project
                  </Button>

                  {selectedProject && (
                    <PaymentForm
                      initialInvestment={selectedProject?.InitialInvestment}
                      projectTitle={selectedProject?.projectTitle}
                      projectUserId={selectedProject?.investorId}
                      projectId={selectedProject?._id}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth={false}
        fullWidth
      >
        <DialogTitle>{selectedProject?._id}</DialogTitle>
        <DialogTitle>{selectedProject?.projectTitle}</DialogTitle>

        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    Project Details
                  </Typography>
                  <Typography>
                    Project Description: {selectedProject?.projectDescription}
                  </Typography>
                  <Typography>
                    Category: {selectedProject?.projectCategory}
                  </Typography>
                  <Typography>
                    Timeline: {selectedProject?.projectTimeline}
                  </Typography>
                  <Typography>
                    Plants to Plant: {selectedProject?.plantsToPlant}
                  </Typography>
                  <Typography>
                    Search Tags: {selectedProject?.searchTags}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    Investment Details
                  </Typography>
                  <Typography>
                    Investment Range: {selectedProject?.InvestmentRange}
                  </Typography>
                  <Typography>
                    Initial Investment: {selectedProject?.InitialInvestment}
                  </Typography>
                  <Typography>
                    Estimated Total: {selectedProject?.EstimatedTotal}
                  </Typography>
                  <Typography>
                    Expected Revenue: {selectedProject?.ExpectedRevenue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    Land Details
                  </Typography>
                  <Typography>
                    Land Location:
                    {selectedProject?.landDetails?.landLocation && (
                      <iframe
                        width="100%"
                        height="300"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        title="Google Map"
                        src={`https://maps.google.com/maps?q=${selectedProject.landDetails.landLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      ></iframe>
                    )}
                  </Typography>

                  <Typography>
                    Land Area: {selectedProject?.landDetails?.landArea}
                  </Typography>
                  <Typography>
                    Project Document:{" "}
                    {selectedProject?.landDetails?.projectDocument && (
                      <a
                        href={selectedProject.landDetails.projectDocument}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        Download Document
                      </a>
                    )}
                  </Typography>
                  <Typography>
                    Reference: {selectedProject?.landDetails?.reference}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    Project Status Details
                  </Typography>
                  <Typography>
                    Project Status: {selectedProject?.projectStatus}
                  </Typography>
                  <Typography>
                    Paid Amount: {selectedProject?.paidAmount}
                  </Typography>
                  <Typography>
                    Investor ID: {selectedProject?.investorId}
                  </Typography>
                  <Typography>
                    Start Date: {selectedProject?.startDate}
                  </Typography>
                  <Typography>End Date: {selectedProject?.endDate}</Typography>
                  <Typography>Duration: {selectedProject?.duration}</Typography>
                  <Typography>
                    Milestone: {selectedProject?.mileston}
                  </Typography>
                  <Typography>Comments: {selectedProject?.comments}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
