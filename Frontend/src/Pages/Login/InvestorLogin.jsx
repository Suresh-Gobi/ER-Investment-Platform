import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export default function InvestorLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/investor/login",
        formData
      );
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Redirect to "/investordash"
      navigate("/investordash");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: "100px" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Investor Login
        </Typography>
        <p style={{ color: "#888" }}>
          Empower your investments with precision and security. Login now to
          access your investor dashboard.
        </p>

        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ alignItems: "center" }}
          >
            Login
          </Button>
        </form>
        {/* <Typography variant="body2" sx={{ marginTop: "10px" }}>
          Don't have an account? <a href="/signup">Sign Up</a>
        </Typography> */}
      </CardContent>
    </Card>
  );
}
