import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Container,
  Card,
  CardContent,
} from "@mui/material";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/admin/login",
        {
          email,
          password,
        }
      );

      const { token } = response.data;

      // Store the token in local storage
      localStorage.setItem("adminToken", token);

      // Redirect to '/admindash'
      window.location.href = "/admindashboard";
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      setError("Login failed: " + error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ marginTop: "50px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            {error && (
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            )}
            <Button variant="contained" type="submit" fullWidth>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
