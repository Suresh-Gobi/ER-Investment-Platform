import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, CircularProgress } from '@mui/material';

export default function TotalInvestment() {
  const [totalInvestment, setTotalInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:5000/api/project/totinvestor')
      .then(response => {
        // Set the totalInvestment state with the correct key from the data received from the API
        setTotalInvestment(response.data.totalPaidAmount);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching total investment:', error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <div>
      <Typography variant="h6" gutterBottom>Total Investment Amount</Typography>
      {loading ? (
        <CircularProgress /> // Show loading indicator while data is being fetched
      ) : (
        <Typography variant="body1">
          Total Investment: {totalInvestment !== null ? totalInvestment : 'N/A'}LKR
        </Typography>
      )}
    </div>
  );
}
