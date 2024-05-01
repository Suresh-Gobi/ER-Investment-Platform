import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalPaidAmount = () => {
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchTotalPaidAmount = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/totinvestor', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response from backend:', response.data);

        setTotalPaidAmount(response.data.totalPaidAmount);
      } catch (error) {
        console.error('Error fetching total paid amount:', error);
      }
    };

    fetchTotalPaidAmount();
  }, []);

  console.log('Total Paid Amount in frontend:', totalPaidAmount);
  return (
    <div>
      <h1>Total Paid Amount by Investor</h1>
      <p>Total Paid Amount: ${totalPaidAmount}</p>
    </div>
  );
};

export default TotalPaidAmount;
