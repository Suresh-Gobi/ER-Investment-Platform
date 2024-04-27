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

  return (
    <div>
      <h1>My Projects</h1>
      <Grid container spacing={3}>
        {projects.map((project) => (
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
                  {project.projectDescription}
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

      <Dialog open={openDialog} onClose={handleCloseDialog}>
      <DialogTitle>{selectedProject?._id}</DialogTitle>
        <DialogTitle>{selectedProject?.projectTitle}</DialogTitle>

        <DialogContent>
        <Typography>{selectedProject?.projectDescription}</Typography>
          <Typography>Category: {selectedProject?.projectCategory}</Typography>
          <Typography>Timeline: {selectedProject?.projectTimeline}</Typography>
          <Typography>Plants to Plant: {selectedProject?.plantsToPlant}</Typography>
          <Typography>Search Tags: {selectedProject?.searchTags}</Typography>
          <Typography>Investment Range: {selectedProject?.InvestmentRange}</Typography>
          <Typography>Initial Investment: {selectedProject?.InitialInvestment}</Typography>
          <Typography>Estimated Total: {selectedProject?.EstimatedTotal}</Typography>
          <Typography>Expected Revenue: {selectedProject?.ExpectedRevenue}</Typography>
          <Typography>Land Location: {selectedProject?.landDetails?.landLocation}</Typography>
          <Typography>Land Area: {selectedProject?.landDetails?.landArea}</Typography>
          <Typography>Project Document: {selectedProject?.landDetails?.projectDocument}</Typography>
          <Typography>Approved: {selectedProject?.landDetails?.approved ? 'Yes' : 'No'}</Typography>
          <Typography>Reference: {selectedProject?.landDetails?.reference}</Typography>
          <Typography>Project Status: {selectedProject?.projectStatus}</Typography>
          <Typography>Paid Amount: {selectedProject?.paidAmount}</Typography>
          <Typography>Investor ID: {selectedProject?.investorId}</Typography>
          <Typography>Start Date: {selectedProject?.startDate}</Typography>
          <Typography>End Date: {selectedProject?.endDate}</Typography>
          <Typography>Duration: {selectedProject?.duration}</Typography>
          <Typography>Milestone: {selectedProject?.mileston}</Typography>
          <Typography>Comments: {selectedProject?.comments}</Typography>
          <Typography>Device ID: {selectedProject?.deviceID}</Typography>
          <Typography>Timestamp: {selectedProject?.timestamp}</Typography>
          <Typography>Location: {selectedProject?.location.coordinates.join(', ')}</Typography>
          <Typography>Soil pH Level: {selectedProject?.soilHealth.pHLevel}</Typography>
          <Typography>Nutrient Levels:</Typography>
          <Typography>- Nitrogen: {selectedProject?.soilHealth.nutrientLevel.nitrogen}</Typography>
          <Typography>- Phosphorus: {selectedProject?.soilHealth.nutrientLevel.phosphorus}</Typography>
          <Typography>- Potassium: {selectedProject?.soilHealth.nutrientLevel.potassium}</Typography>
          <Typography>Water Level: {selectedProject?.soilHealth.waterLevel}</Typography>
          <Typography>Humidity: {selectedProject?.humidity.value} {selectedProject?.humidity.unit}</Typography>
          <Typography>Temperature: {selectedProject?.temperature.value} {selectedProject?.temperature.unit}</Typography>
          <Typography>Farming Area: {selectedProject?.farmingArea}</Typography>
          <Typography>Plant Health - Biomass: {selectedProject?.plantHealth.biomass}</Typography>
          <Typography>CO2 Concentration: {selectedProject?.co2Concentration.value} {selectedProject?.co2Concentration.unit}</Typography>
          <Typography>H2O Concentration: {selectedProject?.h2oConcentration.value} {selectedProject?.h2oConcentration.unit}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
