const express = require("express");
const router = express.Router();
const { createPlant, getAllPlants, filterPlantsByHumidity } = require("../Controllers/plant.Controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// POST route to create a new plant
router.post("/plantcreate", upload.single("plantImage"), createPlant);
router.get("/plantget", getAllPlants);
router.post("/filterPlantsByHumidity", filterPlantsByHumidity);

module.exports = router;
