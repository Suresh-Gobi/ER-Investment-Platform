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

const GraphOne = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/project/getTotalPaidProjectAmount');
        console.log('Total Paid Project Amount Response:', response.data);

        // Format data for LineChart
        const chartData = [
          {
            name: 'Total Investment',
            value: response.data.totalCount, // Assuming the API response has a totalCount property
          },
        ];

        setData(chartData);
      } catch (error) {
        console.error('Error fetching total investment:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Total Paid Project Amount</h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};

export default GraphOne;
