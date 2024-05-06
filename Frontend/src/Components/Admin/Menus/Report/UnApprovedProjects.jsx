import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UnApprovedProjects() {
  const [totalUnapprovedProjects, setTotalUnapprovedProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalUnapprovedProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/totnotapproved');
        console.log('Total Unapproved Projects Response:', response.data);

        const { totalCount } = response.data;
        setTotalUnapprovedProjects(totalCount);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching total unapproved projects:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTotalUnapprovedProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      {totalUnapprovedProjects !== 0 ? (
        <p>Total Unapproved Projects: {totalUnapprovedProjects}</p>
      ) : (
        <p>No unapproved projects found.</p>
      )}
    </div>
  );
}
