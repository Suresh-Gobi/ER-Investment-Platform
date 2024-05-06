import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TotalInvestment() {
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalInvestment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/getTotalPaidProjectAmount');
        console.log('Total Investment Response:', response.data);

        const { totalCount } = response.data; // Update to match response structure
        setTotalInvestment(totalCount);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching total investment:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchTotalInvestment();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <p>Total Investment: {totalInvestment} LKR</p>
    </div>
  );
}
