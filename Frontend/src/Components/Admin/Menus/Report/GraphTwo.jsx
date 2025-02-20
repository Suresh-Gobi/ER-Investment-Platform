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

const GraphTwo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, ongoingProjectsRes, unapprovedProjectsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/project/gettotalprojects'),
          axios.get('http://localhost:5000/api/project/totalprojectcount'),
          axios.get('http://localhost:5000/api/project/totnotapproved'),
        ]);

        const totalProjects = { name: 'Total Projects', value: projectsRes.data.totalCount };
        const totalOngoingProjects = { name: 'Total Ongoing Projects', value: ongoingProjectsRes.data.totalCount };
        const totalUnapprovedProjects = { name: 'Total Unapproved Projects', value: unapprovedProjectsRes.data.totalCount };

        setData([totalProjects, totalOngoingProjects, totalUnapprovedProjects]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Graph Two</h2>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default GraphTwo;
