const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  plantName: {
    type: String,
    required: true,
  },
  plantDescription: String,
  plantSpecies: {
    type: String,
    required: true,
  },
  scientificName: {
    type: String,
    required: true,
  },
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
  suitableLocations: {
    type: [{ lat: Number, long: Number }],
    required: true,
  },
  growingTimeLimit: {
    type: Number,
    required: true,
  },
  plantsPerSquareMeter: {
    type: Number,
    required: true,
  },
  marketRatePerKg: {
    type: Number,
    required: true,
  },
  investmentPerSquareMeter: {
    type: Number,
    required: true,
  },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
