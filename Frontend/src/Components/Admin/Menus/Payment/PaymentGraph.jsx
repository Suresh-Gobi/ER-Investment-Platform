import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export default function PaymentGraph() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    // Fetch project data including expected revenue and total investment
    axios.get('http://localhost:5000/api/project/totinvestor')
      .then(response => {
        console.log('API Response:', response.data); // Debug logging to check API response
        // Extracting the data from the API response
        const projects = response.data;

        // Map the data to the required format for the LineChart component
        const chartData = projects.map(project => ({
          name: project.projectTitle,
          totalInvestment: parseInt(project.EstimatedTotal),
          expectedRevenue: parseInt(project.expectedRevenue),
        }));

        console.log('Formatted Chart Data:', chartData); // Debug logging to check formatted data

        // Updating state with the formatted data
        setProjectData(chartData);
      })
      .catch(error => {
        console.error('Error fetching project data:', error);
      });
  }, []);

  // Static data for testing chart rendering
  const staticData = [
    { name: 'Project A', totalInvestment: 5000, expectedRevenue: 8000 },
    { name: 'Project B', totalInvestment: 7000, expectedRevenue: 10000 },
    { name: 'Project C', totalInvestment: 3000, expectedRevenue: 5000 },
  ];

  return (
    <div>
      <h2>Payment Graph</h2>
      {/* Use staticData for testing chart rendering */}
      <LineChart
        width={800}
        height={400}
        data={staticData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalInvestment" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expectedRevenue" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

