import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

export default function GetPlant() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedPlantData, setEditedPlantData] = useState({
    plantName: "",
    plantDescription: "",
    plantSpecies: "",
    scientificName: "",
    plantImgUrl: "",
    suitableLocations: "",
    growingTimeLimit: "",
    plantsPerSquareMeter: "",
    marketRatePerKg: "",
    investmentPerSquareMeter: "",
  });

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/plants/plantget"
      );
      setPlants(response.data.plants);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const handleViewPlant = (plant) => {
    setSelectedPlant(plant);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditClick = () => {
    setOpenEditDialog(true);
    setEditedPlantData(selectedPlant); // Initialize edited data with the selected plant's data
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/plants/plantupdate/${selectedPlant._id}`,
        editedPlantData
      );
      fetchPlants(); // Refetch the updated plant data
      setOpenEditDialog(false); // Close the edit dialog
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlantData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDeletePlant = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/plants/plantdelete/${selectedPlant._id}`
      );
      fetchPlants(); // Refetch the updated plant data after deletion
      setOpenModal(false); // Close the plant details dialog after deletion
    } catch (error) {
      console.error("Error deleting plant:", error);
    }
  };

  return (
    <div>
      <h2>Plant Details</h2>
      <List>
        {plants.map((plant) => (
          <ListItem key={plant._id}>
            <ListItemText primary={plant.plantName} />
            <Button variant="contained" onClick={() => handleViewPlant(plant)}>
              View
            </Button>
          </ListItem>
        ))}
      </List>

      <Dialog open={openModal} onClose={handleCloseModal}>
        {selectedPlant && (
          <>
            <DialogTitle>{selectedPlant.plantName}</DialogTitle>
            <DialogContent dividers>
              <Typography>
                Description: {selectedPlant.plantDescription}
              </Typography>
              <Typography>Species: {selectedPlant.plantSpecies}</Typography>
              <Typography>
                Scientific Name: {selectedPlant.scientificName}
              </Typography>
              <img
                src={selectedPlant.plantImgUrl}
                alt={selectedPlant.plantName}
                style={{ maxWidth: "100%", height: "auto" }}
              />

              <Typography>
                Suitable Locations: {selectedPlant.suitableLocations}
              </Typography>
              <Typography>
                Growing Time Limit: {selectedPlant.growingTimeLimit}
              </Typography>
              <Typography>
                Plants Per Square Meter: {selectedPlant.plantsPerSquareMeter}
              </Typography>
              <Typography>
                Market Rate Per Kg: {selectedPlant.marketRatePerKg}
              </Typography>
              <Typography>
                Investment Per Square Meter:{" "}
                {selectedPlant.investmentPerSquareMeter}
              </Typography>
              <Button variant="contained" onClick={handleEditClick}>
                Edit
              </Button>
              <Button variant="contained" color="error" onClick={handleDeletePlant}>
                Delete
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Plant Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Plant Name"
            name="plantName"
            value={editedPlantData.plantName}
            onChange={handleInputChange}
          />
          <TextField
            label="Plant Description"
            name="plantDescription"
            value={editedPlantData.plantDescription}
            onChange={handleInputChange}
          />
          <TextField
            label="Plant Species"
            name="plantSpecies"
            value={editedPlantData.plantSpecies}
            onChange={handleInputChange}
          />
          <TextField
            label="Scientific Name"
            name="scientificName"
            value={editedPlantData.scientificName}
            onChange={handleInputChange}
          />
          <TextField
            label="Image URL"
            name="plantImgUrl"
            value={editedPlantData.plantImgUrl}
            onChange={handleInputChange}
          />
          <TextField
            label="Temperature Range"
            name="temperatureRange"
            value={editedPlantData.temperatureRange}
            onChange={handleInputChange}
          />
          <TextField
            label="Humidity Range"
            name="humidityRange"
            value={editedPlantData.humidityRange}
            onChange={handleInputChange}
          />
          <TextField
            label="Suitable Locations"
            name="suitableLocations"
            value={editedPlantData.suitableLocations}
            onChange={handleInputChange}
          />
          <TextField
            label="Growing Time Limit"
            name="growingTimeLimit"
            value={editedPlantData.growingTimeLimit}
            onChange={handleInputChange}
          />
          <TextField
            label="Plants Per Square Meter"
            name="plantsPerSquareMeter"
            value={editedPlantData.plantsPerSquareMeter}
            onChange={handleInputChange}
          />
          <TextField
            label="Market Rate Per Kg"
            name="marketRatePerKg"
            value={editedPlantData.marketRatePerKg}
            onChange={handleInputChange}
          />
          <TextField
            label="Investment Per Square Meter"
            name="investmentPerSquareMeter"
            value={editedPlantData.investmentPerSquareMeter}
            onChange={handleInputChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
