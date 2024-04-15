import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeoLocationAnalysis = () => {
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [areaInSquareMeters, setAreaInSquareMeters] = useState(0);
  const [locationDetails, setLocationDetails] = useState({
    latitude: null,
    longitude: null,
    areaName: '',
  });
  const [polygonVertices, setPolygonVertices] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Load the Google Maps API script dynamically
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDnOmZ9Nv82BJpiRuNHZlT55cZWjLeBviA&libraries=places,drawing`;
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
    const newMap = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    const newDrawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: window.google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: window.google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon'],
      },
    });

    newDrawingManager.setMap(newMap);

    window.google.maps.event.addListener(newDrawingManager, 'overlaycomplete', (event) => {
      if (selectedShape) {
        selectedShape.setMap(null);
      }

      const newShape = event.overlay;
      newShape.type = event.type;
      setSelectedShape(newShape);

      const area = window.google.maps.geometry.spherical.computeArea(newShape.getPath());
      setAreaInSquareMeters(area);

      // Get the vertices of the polygon
      const vertices = newShape.getPath().getArray().map((vertex) => ({
        latitude: vertex.lat(),
        longitude: vertex.lng(),
      }));

      setPolygonVertices(vertices);

      // Get the area name for each vertex
      getAreaNames(vertices);
      // Get weather data for the area
      getWeatherData(vertices[0].latitude, vertices[0].longitude); // Using the first vertex's coordinates
    });

    setMap(newMap);
    setDrawingManager(newDrawingManager);
  };

  const getAreaNames = (vertices) => {
    vertices.forEach((vertex) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: vertex.latitude, lng: vertex.longitude };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            setLocationDetails((prevDetails) => ({
              ...prevDetails,
              areaName: results[0].formatted_address,
            }));
          } else {
            console.error('No results found');
          }
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      });
    });
  };

  const getWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=7fb9f37723118b83f06276e2f3e96221`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null); // Clear weather data if an error occurs
    }
  };
  

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <div>
        <strong>Latitude:</strong> {polygonVertices.length > 0 && polygonVertices[0].latitude} <br />
        <strong>Longitude:</strong> {polygonVertices.length > 0 && polygonVertices[0].longitude} <br />
        <strong>Area Name:</strong> {locationDetails.areaName} <br />
        <strong>Area:</strong> {areaInSquareMeters} square meters <br />
        <strong>Weather:</strong> {weatherData ? `${weatherData.weather[0].main}, ${weatherData.main.temp}°C` : 'Loading...'} <br />
        <strong>Vertices:</strong>
        {polygonVertices.map((vertex, index) => (
          <div key={index}>
            Vertex {index + 1}: Latitude {vertex.latitude}, Longitude {vertex.longitude} - {locationDetails.areaName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeoLocationAnalysis;
