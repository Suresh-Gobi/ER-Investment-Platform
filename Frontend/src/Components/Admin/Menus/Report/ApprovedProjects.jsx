import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ApprovedProjects() {
  const [totalApprovedProjects, setTotalApprovedProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalApprovedProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/totapproved');
        console.log('Total Approved Projects Response:', response.data);

        const { totalCount } = response.data;
        setTotalApprovedProjects(totalCount);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching total approved projects:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTotalApprovedProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Total Approved Projects: {totalApprovedProjects}</p>
    </div>
  );
}
