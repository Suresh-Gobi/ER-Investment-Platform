import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography } from '@mui/material';

export default function ApprovedProjects() {
  const [approvedProjects, setApprovedProjects] = useState([]);

  useEffect(() => {
    const fetchApprovedProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/projectadminget');
        const allProjects = response.data.projects;

        // Filter projects where approved is true
        const approved = allProjects.filter(project => project.landDetails && project.landDetails.approved);

        setApprovedProjects(approved);
      } catch (error) {
        console.error('Failed to fetch approved projects:', error.message);
      }
    };

    fetchApprovedProjects();
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div>
      <h1>Approved Projects</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {approvedProjects.length > 0 ? (
          approvedProjects.map(project => (
            <Card key={project._id} style={{ width: '300px', margin: '10px' }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {project.projectTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Land Area: {project.landDetails.area}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {project.status}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No approved projects found.</p>
        )}
      </div>
    </div>
  );
}
