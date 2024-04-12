import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/projectadminget');
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error.message);
        setError('Failed to fetch projects');
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

  const handleChangeApprovalStatus = (event) => {
    const { value } = event.target;
    setSelectedProject((prevProject) => ({
      ...prevProject,
      landDetails: {
        ...prevProject.landDetails,
        approved: value === 'true',
      },
    }));
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
                  <Typography component="span" variant="body2" color="textPrimary">
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

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{selectedProject?.projectTitle}</DialogTitle>
        <DialogContent>
          <Typography>Category: {selectedProject?.projectCategory}</Typography>
          <Typography>Description: {selectedProject?.projectDescription}</Typography>
          <Typography>Timeline: {selectedProject?.projectTimeline}</Typography>
          <Typography>plantsToPlant: {selectedProject?.plantsToPlant}</Typography>
          <Typography>searchTags: {selectedProject?.searchTags}</Typography>
          <Typography>InvestmentRange: {selectedProject?.InvestmentRange}</Typography>
          <Typography>InitialInvestment: {selectedProject?.InitialInvestment}</Typography>
          <Typography>EstimatedTotal: {selectedProject?.EstimatedTotal}</Typography>
          <Typography>ExpectedRevenue: {selectedProject?.ExpectedRevenue}</Typography>
          {selectedProject?.landDetails && (
            <div>
              <Typography variant="h6">Land Details</Typography>
              <Typography>Location: {selectedProject.landDetails.landLocation}</Typography>
              <Typography>Area: {selectedProject.landDetails.landArea}</Typography>
              <Typography>projectDocument: {selectedProject.landDetails.projectDocument}</Typography>
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
                value={selectedProject.landDetails.approved ? 'true' : 'false'}
                onChange={handleChangeApprovalStatus}
                fullWidth
                variant="outlined"
                label="Approval Status"
              >
                <MenuItem value="true">Approved</MenuItem>
                <MenuItem value="false">Not Approved Yet</MenuItem>
              </Select>
              <Typography>reference: {selectedProject.landDetails.reference}</Typography>
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
