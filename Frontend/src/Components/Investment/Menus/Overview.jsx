import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TotalProjects from './ProjectDetails/TotalProjects';

export default function Overview() {
  const [userDetails, setUserDetails] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [locationDetails, setLocationDetails] = useState(null);
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

      // Get weather data based on user's location
      getUserLocation();
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

  // Function to get user's location and fetch weather data
  const getUserLocation = async () => {
    try {
      const locationResponse = await axios.get("https://ipapi.co/json/");
      const {
        city,
        region,
        country_name,
        country_code,
        latitude,
        longitude,
        timezone,
        currency,
        languages,
      } = locationResponse.data;

      // Set location details in state
      setLocationDetails({
        city,
        region,
        country_name,
        country_code,
        latitude,
        longitude,
        timezone,
        currency,
        languages,
      });

      const weatherResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${region}&appid=7fb9f37723118b83f06276e2f3e96221&units=metric`
      );
      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.error("Error fetching location and weather data:", error);
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
            {locationDetails ? (
              <div>
                <Typography variant="body1" gutterBottom>
                  Location: {locationDetails.city},{" "}
                  {locationDetails.country_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Region: {locationDetails.region}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Country Code: {locationDetails.country_code}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Latitude: {locationDetails.latitude}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Longitude: {locationDetails.longitude}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Timezone: {locationDetails.timezone}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Currency: {locationDetails.currency}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Languages: {locationDetails.languages}
                </Typography>
              </div>
            ) : (
              <Typography variant="body1">
                Loading location details...
              </Typography>
            )}
            {weatherData ? (
              <div>
                <Typography variant="body1" gutterBottom>
                  Location: {weatherData.name}, {weatherData.sys.country}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Temperature: {weatherData.main.temp} °C
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Weather: {weatherData.weather[0].description}
                </Typography>
              </div>
            ) : (
              <Typography variant="body1">Loading weather data...</Typography>
            )}
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
      <TotalProjects/>
    </Card>
  );
}
