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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

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
      <br />
      <Card className="container" style={{padding: '20px'}}>
        <Typography variant="subtitle1">
          Total Projects Count : {projects.length}
        </Typography>
      </Card>
      <br />
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
      <br/>

      <LineChart width={600} height={300} data={projects}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="projectTitle" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="EstimatedTotal" stroke="#8884d8" />
        <Line type="monotone" dataKey="ExpectedRevenue" stroke="#82ca9d" />
      </LineChart>

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
          <Typography>{selectedProject?.EstimatedTotal}</Typography>
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
