import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TotalInvestment() {
  const [totalInvestment, setTotalInvestment] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:5000/api/project/totinvestor')
      .then(response => {
        // Set the totalInvestment state with the correct key from the data received from the API
        setTotalInvestment(response.data.totalPaidAmount);
      })
      .catch(error => {
        console.error('Error fetching total investment:', error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  return (
    <div>
      <h2>Total Investment Amount</h2>
      {totalInvestment !== null ? (
        <p>Total Investment: ${totalInvestment}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
