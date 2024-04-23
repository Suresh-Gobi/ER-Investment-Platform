const Plant = require("../Models/Plant.Model");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const secretKey = 'my-secret-code';

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
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode the token to get the user ID
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

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

const updatePlant = async (req, res) => {
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
    const plantId = req.params.id; // Assuming the plant ID is passed in the request URL

    // Check if the plant exists
    const existingPlant = await Plant.findById(plantId);
    if (!existingPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    // Update plant details
    existingPlant.plantName = plantName;
    existingPlant.plantDescription = plantDescription;
    existingPlant.plantSpecies = plantSpecies;
    existingPlant.scientificName = scientificName;
    existingPlant.temperatureRange = temperatureRange;
    existingPlant.humidityRange = humidityRange;
    existingPlant.suitableLocations = suitableLocations;
    existingPlant.growingTimeLimit = growingTimeLimit;
    existingPlant.plantsPerSquareMeter = plantsPerSquareMeter;
    existingPlant.marketRatePerKg = marketRatePerKg;
    existingPlant.investmentPerSquareMeter = investmentPerSquareMeter;

    // Save the updated plant
    await existingPlant.save();

    res
      .status(200)
      .json({ message: "Plant updated successfully", plant: existingPlant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deletePlant = async (req, res) => {
  try {
    const plantId = req.params.id; // Assuming the plant ID is passed in the request URL

    // Use findByIdAndDelete to find and delete the plant
    const deletedPlant = await Plant.findByIdAndDelete(plantId);

    if (!deletedPlant) {
      return res.status(404).json({ message: "Plant not found" });
    }

    res
      .status(200)
      .json({ message: "Plant deleted successfully", plant: deletedPlant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createPlant,
  getAllPlants,
  filterPlantsByHumidity,
  updatePlant,
  deletePlant,
};
