const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  plantName: String,
  plantDescription: String,
  plantSpecies: String,
  scientificName: String,
  plantImgUrl: String,
  temperatureRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  humidityRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  suitableLocations: String,
  growingTimeLimit:Number,
  plantsPerSquareMeter: Number,
  marketRatePerKg: Number,
  investmentPerSquareMeter: Number,
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
