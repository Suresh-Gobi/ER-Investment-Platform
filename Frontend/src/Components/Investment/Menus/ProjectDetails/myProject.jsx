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
        <DialogTitle>{selectedProject?.projectTitle}</DialogTitle>
        <DialogContent>
          <Typography>{selectedProject?.projectDescription}</Typography>
          {/* Add more project details here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
