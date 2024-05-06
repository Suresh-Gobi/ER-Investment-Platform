import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const Overview = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/project/gettotalprojects");
        console.log("Total Projects Response:", response.data);
        setTotalProjects(response.data.totalProjects);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, []);

  console.log("Total Projects:", totalProjects);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography>Total Projects: {totalProjects}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Overview;
