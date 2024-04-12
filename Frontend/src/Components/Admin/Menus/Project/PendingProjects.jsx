import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function PendingProjects() {
  const [pendingProjects, setPendingProjects] = useState([]);

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/projectadminget');
        const allProjects = response.data.projects;

        // Filter projects where approved is false or undefined
        const pending = allProjects.filter(project => !project.landDetails || !project.landDetails.approved);

        setPendingProjects(pending);
      } catch (error) {
        console.error('Failed to fetch pending projects:', error.message);
      }
    };

    fetchPendingProjects();
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div>
      <h1>Pending Projects</h1>
      {pendingProjects.length > 0 ? (
        <ul>
          {pendingProjects.map(project => (
            <li key={project._id}>{project.projectTitle}</li>
          ))}
        </ul>
      ) : (
        <p>No pending projects found.</p>
      )}
    </div>
  );
}
