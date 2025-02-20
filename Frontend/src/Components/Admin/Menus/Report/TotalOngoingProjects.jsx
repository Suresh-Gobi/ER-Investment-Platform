import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TotalOngoingProjects() {
  const [totalOngoingProjects, setTotalOngoingProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalOngoingProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/totalprojectcount');
        console.log('Total Ongoing Projects Response:', response.data);

        const { totalCount } = response.data;
        setTotalOngoingProjects(totalCount);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching total ongoing projects:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTotalOngoingProjects();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>Total Ongoing Projects: {totalOngoingProjects}</p>
    </div>
  );
}
