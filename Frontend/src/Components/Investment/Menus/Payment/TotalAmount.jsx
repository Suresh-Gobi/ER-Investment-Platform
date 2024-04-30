import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TotalAmount() {
  const [totalAmount, setTotalAmount] = useState(null);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        // Extract the token from local storage
        const token = localStorage.getItem('token');
        
        // Make a GET request to the API endpoint with the token in the Authorization header
        const response = await axios.get('http://localhost:5000/api/project/totalamount', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Update the total amount state with the fetched data
        setTotalAmount(response.data.totalPaidAmount);
      } catch (error) {
        console.error('Error fetching total amount:', error);
        // Handle error if needed
      }
    };

    // Call the fetchTotalAmount function when the component mounts
    fetchTotalAmount();
  }, []);

  return (
    <div>
      <h2>Total Amount of Projects:</h2>
      {totalAmount !== null ? (
        <p>{`$${totalAmount}`}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
