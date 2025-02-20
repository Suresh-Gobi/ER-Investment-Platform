import React from 'react';
import { Typography, Button } from '@mui/material';

export default function Success() {
  const redirectToDashboard = () => {
    // Redirect to the investor dashboard page
    window.location.href = '/investor-dashboard';
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Payment Successful
      </Typography>
      <Typography variant="body1" gutterBottom>
        Congratulations! Your payment was successful.
      </Typography>
      <Button variant="contained" color="primary" onClick={redirectToDashboard}>
        Go to Investor Dashboard
      </Button>
    </div>
  );
}
