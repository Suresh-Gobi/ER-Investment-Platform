import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Save the token in local storage
      localStorage.setItem("token", data.token);

      // Clear any previous error messages
      setError("");

      // Redirect to another page after successful login (replace with your actual redirect logic)
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error (e.g., display error message)
      setError("Error logging in: " + error.message);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        marginTop: "100px",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ m: 1, minWidth: 300 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ m: 1, minWidth: 300 }}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Typography variant="body2" sx={{ marginTop: "10px" }}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </Typography>
      </CardContent>
    </Card>
  );
}
