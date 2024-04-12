import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      {approvedProjects.length > 0 ? (
        <ul>
          {approvedProjects.map(project => (
            <li key={project._id}>{project.projectTitle}</li>
          ))}
        </ul>
      ) : (
        <p>No approved projects found.</p>
      )}
    </div>
  );
}
