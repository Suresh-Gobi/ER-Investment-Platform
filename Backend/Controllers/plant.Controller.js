const Plant = require("../Models/Plant.Model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createPlant = async (req, res) => {
  try {
    const {
      plantName,
      plantDescription,
      plantSpecies,
      scientificName,
      temperatureRange,
      humidityRange,
      suitableLocations,
      growingTimeLimit,
      plantsPerSquareMeter,
      marketRatePerKg,
      investmentPerSquareMeter,
    } = req.body;

    // Upload plant image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const newPlant = new Plant({
      plantName,
      plantDescription,
      plantSpecies,
      scientificName,
      plantImgUrl: result.secure_url,
      temperatureRange,
      humidityRange,
      suitableLocations,
      growingTimeLimit,
      plantsPerSquareMeter,
      marketRatePerKg,
      investmentPerSquareMeter,
    });

    await newPlant.save();

    res
      .status(201)
      .json({ message: "Plant created successfully", plant: newPlant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    res.status(200).json({ message: "Plants retrieved successfully", plants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const filterPlantsByHumidity = async (req, res) => {
  try {
    const { currentHumidity } = req.body; // Assuming the request contains currentHumidity data

    // Fetch plants from the database based on currentHumidity
    const filteredPlants = await Plant.find({
      "humidityRange.min": { $lte: currentHumidity },
      "humidityRange.max": { $gte: currentHumidity },
    });

    res
      .status(200)
      .json({ message: "Plants filtered successfully", filteredPlants });
  } catch (error) {
    console.error("Error filtering plants by humidity:", error);
    res
      .status(500)
      .json({ message: "Server error while filtering plants by humidity" });
  }
};

module.exports = { createPlant, getAllPlants, filterPlantsByHumidity };
