import React from "react";
import { ArrowBackIos as ArrowBackIcon } from "@mui/icons-material";
import InvestorLogin from "./InvestorLogin";
import Login from "./Login";
import { Box, Container, Grid, Typography, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function MainLogin() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: "50px" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
        <IconButton component={Link} to="/" aria-label="Go Back">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: "10px" }}>
          Go Back
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={5}>
          <InvestorLogin />
          <Typography variant="body2" sx={{ marginTop: "10px", marginLeft: "40px" }}>
            Both Investor and Activist Don't have an account? <a href="/signup">Sign Up</a>
          </Typography>
        </Grid>
        <Grid item xs={4} sm={5}>
          <Login />
        </Grid>
      </Grid>
    </Container>
  );
}
