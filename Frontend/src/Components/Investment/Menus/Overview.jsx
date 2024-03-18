import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

export default function Overview() {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("Overview"); // Set initial value to "Overview"

  useEffect(() => {
    // Extract token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the token
      const decodedToken = decodeToken(token);

      // Extract user details from decoded token
      const { displayName, email, role } = decodedToken;

      // Set user details in state
      setUserDetails({ displayName, email, role });
    } else {
      console.error("No token found in local storage");
    }
  }, []);

  // Function to decode the token
  const decodeToken = (token) => {
    try {
      // Decode the token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleEditProfile = () => {
    // Set the selected item to "Profile" when editing profile
    setSelectedItem("Profile");
  };

  return (
    <Card>
      <CardContent>
        {userDetails ? (
          <div>
            <Typography variant="h4" gutterBottom>
              Welcome, {userDetails.displayName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {userDetails.email}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {/* {userDetails.role} */}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={handleEditProfile}>
                Edit Profile
              </Button>
            </Box>
          </div>
        ) : (
          <Typography variant="body1">Loading user details...</Typography>
        )}
      </CardContent>
    </Card>
  );
}
