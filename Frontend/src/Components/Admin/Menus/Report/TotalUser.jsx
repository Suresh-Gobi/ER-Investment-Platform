import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TotalUser() {
  const [totalInvestors, setTotalInvestors] = useState(0);
  const [totalActivists, setTotalActivists] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/totalusers');
        console.log('Total Users Response:', response.data);

        const { totalInvestors, totalActivists } = response.data;
        setTotalInvestors(totalInvestors);
        setTotalActivists(totalActivists);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching total users:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTotalUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Total Users</h1>
      <p>Total Investors: {totalInvestors}</p>
      <p>Total Activists: {totalActivists}</p>
    </div>
  );
}
