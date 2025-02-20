import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GeoLocationAnalysis = () => {
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [areaInSquareMeters, setAreaInSquareMeters] = useState(0);
  const [locationDetails, setLocationDetails] = useState({
    latitude: null,
    longitude: null,
    areaName: "",
  });
  const [polygonVertices, setPolygonVertices] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [pastWeatherData, setPastWeatherData] = useState([]);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnOmZ9Nv82BJpiRuNHZlT55cZWjLeBviA&libraries=places,drawing`; // Replace YOUR_API_KEY with your actual API key
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeMap = () => {
    const mapOptions = {
      center: { lat: 0, lng: 0 },
      zoom: 2,
    };
    const newMap = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    const newDrawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ["polygon"],
      },
    });

    newDrawingManager.setMap(newMap);

    window.google.maps.event.addListener(
      newDrawingManager,
      "overlaycomplete",
      (event) => {
        if (selectedShape) {
          selectedShape.setMap(null);
        }

        const newShape = event.overlay;
        newShape.type = event.type;
        setSelectedShape(newShape);

        const area = window.google.maps.geometry.spherical.computeArea(
          newShape.getPath()
        );
        setAreaInSquareMeters(area);

        // Get the vertices of the polygon
        const vertices = newShape
          .getPath()
          .getArray()
          .map((vertex) => ({
            latitude: vertex.lat(),
            longitude: vertex.lng(),
          }));

        setPolygonVertices(vertices);

        // Get the area name for each vertex
        getAreaNames(vertices);
        // Get weather data for the area
        getWeatherData(vertices[0].latitude, vertices[0].longitude); 
      }
    );

    setMap(newMap);
    setDrawingManager(newDrawingManager);
  };

  const getAreaNames = (vertices) => {
    vertices.forEach((vertex) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: vertex.latitude, lng: vertex.longitude };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            setLocationDetails((prevDetails) => ({
              ...prevDetails,
              areaName: results[0].formatted_address,
            }));
          } else {
            console.error("No results found");
          }
        } else {
          console.error("Geocoder failed due to: " + status);
        }
      });
    });
  };

  const getWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=7fb9f37723118b83f06276e2f3e96221`
      );
      setWeatherData(response.data);
      if (response.data && response.data.list) {
        // Filter past three years data by month
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const pastYearsData = response.data.list.filter((item) => {
          const itemDate = new Date(item.dt * 1000);
          return (
            itemDate.getFullYear() >= currentYear - 3 &&
            itemDate.getMonth() <= currentMonth
          );
        });
        setPastWeatherData(pastYearsData);
        setCurrentWeatherData(response.data.list[0]); // Set current weather data
        filterPlantsByHumidity(response.data.list); // Pass weather data to filter function
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null); // Clear weather data if an error occurs
    }
  };

  const filterPlantsByHumidity = async (weatherList) => {
    try {
      const averageHumidity =
        weatherList.reduce((sum, item) => sum + item.main.humidity, 0) /
        weatherList.length;

      const response = await axios.post(
        "http://localhost:5000/api/plants/filterPlantsByHumidity",
        { currentHumidity: averageHumidity }
      );

      setPlants(response.data.filteredPlants); // Update state with filtered plants
    } catch (error) {
      console.error("Error filtering plants:", error);
      setPlants([]); // Clear plants if an error occurs
    }
  };

  // Function to calculate total revenue
  const calculateTotalRevenue = (plant, areaInSquareMeters) => {
    const growingTimeLimit = plant.growingTimeLimit; // in days
    const plantsPerSquareMeter = plant.plantsPerSquareMeter;
    const marketRatePerKg = plant.marketRatePerKg; // $ per kg
    const investmentPerSquareMeter = plant.investmentPerSquareMeter; // $

    // Calculate total revenue
    const totalPlants = plantsPerSquareMeter * areaInSquareMeters;
    const totalRevenue =
      (totalPlants * marketRatePerKg) / investmentPerSquareMeter;

    return totalRevenue.toFixed(2); // Round to two decimal places
  };

  const formatWeatherDataForChart = () => {
    return pastWeatherData.map((item) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temperature: item.main.temp,
      humidity: item.main.humidity,
    }));
  };

  const handleOpenModal = (plant) => {
    setSelectedPlant(plant);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div>
        <Grid container spacing={2}>
          {/* Display first card */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Location Details</Typography>
                <Typography>
                  <strong>Latitude:</strong>{" "}
                  {polygonVertices.length > 0 && polygonVertices[0].latitude}
                </Typography>
                <Typography>
                  <strong>Longitude:</strong>{" "}
                  {polygonVertices.length > 0 && polygonVertices[0].longitude}
                </Typography>
                <Typography>
                  <strong>Area Name:</strong> {locationDetails.areaName}
                </Typography>
                <Typography>
                  <strong>Area:</strong> {areaInSquareMeters} square meters
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Display second card */}
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Weather Details</Typography>
                <Typography>
                  <strong>Current Weather:</strong>{" "}
                  {currentWeatherData &&
                  currentWeatherData.weather &&
                  currentWeatherData.weather.length > 0
                    ? `${currentWeatherData.weather[0].main}, ${currentWeatherData.main.temp}°C, Humidity: ${currentWeatherData.main.humidity}%`
                    : "No weather data"}
                </Typography>
                <Typography>
                  <strong>Weather:</strong>{" "}
                  {weatherData &&
                  weatherData.weather &&
                  weatherData.weather.length > 0
                    ? `${weatherData.weather[0].main}, ${weatherData.main.temp}°C, Humidity: ${weatherData.main.humidity}%`
                    : "No weather data"}
                </Typography>
                <Typography variant="h6">Vertices</Typography>
                {/* Display vertices */}
                {polygonVertices.map((vertex, index) => (
                  <Typography key={index}>
                    Vertex {index + 1}: Latitude {vertex.latitude}, Longitude{" "}
                    {vertex.longitude} - {locationDetails.areaName}
                  </Typography>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <strong>Predicited Weather Data:</strong>

        <div id="map" style={{ width: "100%" }}></div>
        <div>
          <Grid container spacing={2}>
            {/* Display first card */}
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  {pastWeatherData.map((item, index) => (
                    <div key={index}>
                      Date: {new Date(item.dt * 1000).toLocaleDateString()},
                      Temperature: {item.main.temp}°C, Humidity:{" "}
                      {item.main.humidity}%
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
            {/* Display second card for LineChart */}
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Predicted Weather Data Chart</Typography>
                  <LineChart
                    width={800}
                    height={400}
                    data={formatWeatherDataForChart()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="#FF4500"
                    />
                    <Line type="monotone" dataKey="humidity" stroke="#00BFFF" />
                  </LineChart>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>

      <div className="container">
        <h1>Suggested Plants to Gorw According to the Geo Location</h1>
        <br />
        <Grid container spacing={2}>
          {plants.map((plant) => (
            <Grid key={plant._id} item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  src={plant.plantImgUrl}
                  alt={plant.plantName}
                  style={{ height: 150, objectFit: "cover" }} // Reduced height
                />
                <CardContent>
                  <Typography variant="h6">{plant.plantName}</Typography>
                  {/* Pass the plant object to handleOpenModal */}
                  <Button onClick={() => handleOpenModal(plant)}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

      {/* Render modal content conditionally */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            width: "90%",
            maxWidth: 600,
            bgcolor: "background.paper",
            p: 2,
            margin: "auto",
          }}
        >
          {selectedPlant && (
            <div key={selectedPlant._id}>
              {/* Use selectedPlant._id as a unique key */}
              <strong>Image:</strong>{" "}
              <img
                src={selectedPlant.plantImgUrl}
                alt={selectedPlant.plantName}
                style={{ maxWidth: "200px" }}
              />
              <strong>Plant Name:</strong> {selectedPlant.plantName}
              <br />
              <strong>Description:</strong> {selectedPlant.plantDescription}
              <br />
              <strong>Species:</strong> {selectedPlant.plantSpecies}
              <br />
              <strong>Scientific Name:</strong> {selectedPlant.scientificName}
              <br />
              <br />
              <strong>Plants Per Square Meter:</strong>{" "}
              {selectedPlant.plantsPerSquareMeter}
              <br />
              <strong>Market Rate Per Kg:</strong> LKR
              {selectedPlant.marketRatePerKg}
              <br />
              <strong>Investment Per Square Meter:</strong> LKR
              {selectedPlant.investmentPerSquareMeter}
              <br />
              <strong>Total Revenue:</strong> LKR
              {calculateTotalRevenue(selectedPlant, areaInSquareMeters)}
              <br />
              {/* Add other plant details */}
              <Button onClick={handleCloseModal}>Close</Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default GeoLocationAnalysis;
