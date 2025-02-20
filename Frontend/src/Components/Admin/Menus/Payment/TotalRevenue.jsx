import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function TotalRevenue() {
  const generateFakeData = () => {
    // Generate random number between 1000 and 5000
    const getRandomRevenue = () => Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

    // Generate fake data for investors' earned revenue
    const investorsData = Array.from({ length: 5 }, (_, index) => getRandomRevenue());

    return investorsData;
  };

  const investorsData = generateFakeData();
  const totalRevenue = investorsData.reduce((acc, revenue) => acc + revenue, 0);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>Total Earned Revenue</Typography>
        <Typography variant="body1">Total Revenue: {totalRevenue}LKR</Typography>
      </CardContent>
    </Card>
  );
}
