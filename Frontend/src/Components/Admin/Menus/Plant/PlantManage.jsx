import React, { useState } from 'react';
import axios from 'axios';

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

  return (
    <div>
      <h1>Create Plant</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="plantName">Plant Name:</label>
        <input
          type="text"
          id="plantName"
          name="plantName"
          value={formData.plantName}
          onChange={handleChange}
        />

        <label htmlFor="plantDescription">Plant Description:</label>
        <textarea
          id="plantDescription"
          name="plantDescription"
          value={formData.plantDescription}
          onChange={handleChange}
        ></textarea>

        <label htmlFor="plantSpecies">Plant Species:</label>
        <input
          type="text"
          id="plantSpecies"
          name="plantSpecies"
          value={formData.plantSpecies}
          onChange={handleChange}
        />

        <label htmlFor="scientificName">Scientific Name:</label>
        <input
          type="text"
          id="scientificName"
          name="scientificName"
          value={formData.scientificName}
          onChange={handleChange}
        />

        <label htmlFor="temperatureRangeMin">Temperature Range (Min):</label>
        <input
          type="number"
          id="temperatureRangeMin"
          name="temperatureRangeMin"
          value={formData.temperatureRangeMin}
          onChange={handleChange}
        />

        <label htmlFor="temperatureRangeMax">Temperature Range (Max):</label>
        <input
          type="number"
          id="temperatureRangeMax"
          name="temperatureRangeMax"
          value={formData.temperatureRangeMax}
          onChange={handleChange}
        />

        <label htmlFor="humidityRangeMin">Humidity Range (Min):</label>
        <input
          type="number"
          id="humidityRangeMin"
          name="humidityRangeMin"
          value={formData.humidityRangeMin}
          onChange={handleChange}
        />

        <label htmlFor="humidityRangeMax">Humidity Range (Max):</label>
        <input
          type="number"
          id="humidityRangeMax"
          name="humidityRangeMax"
          value={formData.humidityRangeMax}
          onChange={handleChange}
        />

        <label htmlFor="growingTimeLimit">Growing Time Limit:</label>
        <input
          type="number"
          id="growingTimeLimit"
          name="growingTimeLimit"
          value={formData.growingTimeLimit}
          onChange={handleChange}
        />

        <label htmlFor="plantsPerSquareMeter">Plants Per Square Meter:</label>
        <input
          type="number"
          id="plantsPerSquareMeter"
          name="plantsPerSquareMeter"
          value={formData.plantsPerSquareMeter}
          onChange={handleChange}
        />

        <label htmlFor="marketRatePerKg">Market Rate Per Kg:</label>
        <input
          type="number"
          id="marketRatePerKg"
          name="marketRatePerKg"
          value={formData.marketRatePerKg}
          onChange={handleChange}
        />

        <label htmlFor="investmentPerSquareMeter">Investment Per Square Meter:</label>
        <input
          type="number"
          id="investmentPerSquareMeter"
          name="investmentPerSquareMeter"
          value={formData.investmentPerSquareMeter}
          onChange={handleChange}
        />

        <label htmlFor="suitableLocations">Suitable Locations:</label>
        <input
          type="text"
          id="suitableLocations"
          name="suitableLocations"
          value={formData.suitableLocations}
          onChange={handleChange}
        />

        <label htmlFor="plantImage">Plant Image:</label>
        <input
          type="file"
          id="plantImage"
          name="plantImage"
          onChange={handleFileChange}
        />

        <button type="submit">Create Plant</button>
      </form>
    </div>
  );
}
