import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AllProjects() {
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/projectadminget');
        const projects = response.data.projects;
        setAllProjects(projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error.message);
      }
    };

    fetchAllProjects();
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div>
      <h1>All Projects</h1>
      {allProjects.length > 0 ? (
        <ul>
          {allProjects.map(project => (
            <li key={project._id}>{project.projectTitle}</li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
