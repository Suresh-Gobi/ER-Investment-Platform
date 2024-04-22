import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnOmZ9Nv82BJpiRuNHZlT55cZWjLeBviA&libraries=places,drawing`; // Replace YOUR_API_KEY with your actual API key
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      // Clean up function to remove the script when the component unmounts
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
        getWeatherData(vertices[0].latitude, vertices[0].longitude); // Using the first vertex's coordinates
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
  const calculateTotalRevenue = (plant) => {
    const growingTimeLimit = plant.growingTimeLimit; // in days
    const plantsPerSquareMeter = plant.plantsPerSquareMeter;
    const marketRatePerKg = plant.marketRatePerKg; // $ per kg
    const investmentPerSquareMeter = plant.investmentPerSquareMeter; // $

    // Calculate total revenue
    const totalPlants = plantsPerSquareMeter * areaInSquareMeters;
    const totalRevenue =
      ( totalPlants * marketRatePerKg) /
      investmentPerSquareMeter;

    return totalRevenue.toFixed(2); // Round to two decimal places
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "400px" }}></div>
      <div>
        <strong>Latitude:</strong>{" "}
        {polygonVertices.length > 0 && polygonVertices[0].latitude} <br />
        <strong>Longitude:</strong>{" "}
        {polygonVertices.length > 0 && polygonVertices[0].longitude} <br />
        <strong>Area Name:</strong> {locationDetails.areaName} <br />
        <strong>Area:</strong> {areaInSquareMeters} square meters <br />
        <strong>Current Weather:</strong>{" "}
        {currentWeatherData &&
        currentWeatherData.weather &&
        currentWeatherData.weather.length > 0
          ? `${currentWeatherData.weather[0].main}, ${currentWeatherData.main.temp}°C, Humidity: ${currentWeatherData.main.humidity}%`
          : "No weather data"}{" "}
        <br />
        <strong>Weather:</strong>{" "}
        {weatherData && weatherData.weather && weatherData.weather.length > 0
          ? `${weatherData.weather[0].main}, ${weatherData.main.temp}°C, Humidity: ${weatherData.main.humidity}%`
          : "No weather data"}{" "}
        <br />
        <strong>Vertices:</strong>
        {polygonVertices.map((vertex, index) => (
          <div key={index}>
            Vertex {index + 1}: Latitude {vertex.latitude}, Longitude{" "}
            {vertex.longitude} - {locationDetails.areaName}
          </div>
        ))}
      </div>
      <div>
        <strong>Past 3 Years Weather Data:</strong>
        {pastWeatherData.map((item, index) => (
          <div key={index}>
            Date: {new Date(item.dt * 1000).toLocaleDateString()}, Temperature:{" "}
            {item.main.temp}°C, Humidity: {item.main.humidity}%
          </div>
        ))}
      </div>

      <div>
        <h2>Filtered Plant Details</h2>
        <ul>
          {plants.map((plant) => (
            <li key={plant._id}>
              <strong>Plant Name:</strong> {plant.plantName}
              <br />
              <strong>Description:</strong> {plant.plantDescription}
              <br />
              <strong>Species:</strong> {plant.plantSpecies}
              <br />
              <strong>Scientific Name:</strong> {plant.scientificName}
              <br />
              <strong>Image:</strong>{" "}
              <img
                src={plant.plantImgUrl}
                alt={plant.plantName}
                style={{ maxWidth: "200px" }}
              />
              <br />
              <strong>Temperature Range:</strong> {plant.temperatureRange.min}°C
              - {plant.temperatureRange.max}°C
              <br />
              <strong>Humidity Range:</strong> {plant.humidityRange.min}% -{" "}
              {plant.humidityRange.max}%
              <br />
              <strong>Suitable Locations:</strong> {plant.suitableLocations}
              <br />
              <strong>Growing Time Limit:</strong> {plant.growingTimeLimit} days
              <br />
              <strong>Plants Per Square Meter:</strong>{" "}
              {plant.plantsPerSquareMeter}
              <br />
              <strong>Market Rate Per Kg:</strong> ${plant.marketRatePerKg}
              <br />
              <strong>Investment Per Square Meter:</strong> $
              {plant.investmentPerSquareMeter}
              <br />
              <strong>Total Revenue:</strong> ${calculateTotalRevenue(plant)}
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GeoLocationAnalysis;
