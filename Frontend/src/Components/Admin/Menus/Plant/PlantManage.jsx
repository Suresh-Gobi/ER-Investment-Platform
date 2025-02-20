import React, { useState } from 'react';
import axios from 'axios';
import {
  TextField,
  TextareaAutosize,
  Button,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

export default function PlantManage() {
  const [formData, setFormData] = useState({
    plantName: '',
    plantDescription: '',
    plantSpecies: '',
    scientificName: '',
    temperatureRangeMin: '',
    temperatureRangeMax: '',
    humidityRangeMin: '',
    humidityRangeMax: '',
    growingTimeLimit: '',
    plantsPerSquareMeter: '',
    marketRatePerKg: '',
    investmentPerSquareMeter: '',
    suitableLocations: '',
    plantImage: null,
  });

  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      plantImage: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('temperatureRange[min]', formData.temperatureRangeMin);
    formDataToSend.append('temperatureRange[max]', formData.temperatureRangeMax);
    formDataToSend.append('humidityRange[min]', formData.humidityRangeMin);
    formDataToSend.append('humidityRange[max]', formData.humidityRangeMax);
    formDataToSend.delete('temperatureRangeMin');
    formDataToSend.delete('temperatureRangeMax');
    formDataToSend.delete('humidityRangeMin');
    formDataToSend.delete('humidityRangeMax');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/plants/plantcreate',
        formDataToSend
      );
      console.log(response.data);
      // Reset form after successful submission
      setFormData({
        plantName: '',
        plantDescription: '',
        plantSpecies: '',
        scientificName: '',
        temperatureRangeMin: '',
        temperatureRangeMax: '',
        humidityRangeMin: '',
        humidityRangeMax: '',
        growingTimeLimit: '',
        plantsPerSquareMeter: '',
        marketRatePerKg: '',
        investmentPerSquareMeter: '',
        suitableLocations: '',
        plantImage: null,
      });
      // Handle success message or redirection to another page
    } catch (error) {
      console.error(error);
      // Handle error message or display error to the user
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Create Plant Record
      </Button>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Create Plant</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="plantName"
              name="plantName"
              label="Plant Name"
              value={formData.plantName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="plantDescription"
              name="plantDescription"
              label="Plant Description"
              value={formData.plantDescription}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="plantSpecies"
              name="plantSpecies"
              label="Plant Species"
              value={formData.plantSpecies}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="scientificName"
              name="scientificName"
              label="Scientific Name"
              value={formData.scientificName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="temperatureRangeMin"
              name="temperatureRangeMin"
              label="Temperature Range (Min)"
              type="number"
              value={formData.temperatureRangeMin}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="temperatureRangeMax"
              name="temperatureRangeMax"
              label="Temperature Range (Max)"
              type="number"
              value={formData.temperatureRangeMax}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="humidityRangeMin"
              name="humidityRangeMin"
              label="Humidity Range (Min)"
              type="number"
              value={formData.humidityRangeMin}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="humidityRangeMax"
              name="humidityRangeMax"
              label="Humidity Range (Max)"
              type="number"
              value={formData.humidityRangeMax}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="growingTimeLimit"
              name="growingTimeLimit"
              label="Growing Time Limit"
              type="number"
              value={formData.growingTimeLimit}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="plantsPerSquareMeter"
              name="plantsPerSquareMeter"
              label="Plants Per Square Meter"
              type="number"
              value={formData.plantsPerSquareMeter}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="marketRatePerKg"
              name="marketRatePerKg"
              label="Market Rate Per Kg"
              type="number"
              value={formData.marketRatePerKg}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="investmentPerSquareMeter"
              name="investmentPerSquareMeter"
              label="Investment Per Square Meter"
              type="number"
              value={formData.investmentPerSquareMeter}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="suitableLocations"
              name="suitableLocations"
              label="Suitable Locations"
              value={formData.suitableLocations}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <input
              id="plantImage"
              name="plantImage"
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <label htmlFor="plantImage">
              <Button component="span" variant="outlined">
                Upload Plant Image
              </Button>
            </label>
          </Grid>
        </Grid>
          </form>
        </DialogContent>
        {/* <div>
            <p>
            Plant created successfully
            </p>
          </div> */}
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Create Plant
          </Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}
