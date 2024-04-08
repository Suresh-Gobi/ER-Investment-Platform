const express = require("express");
const router = express.Router();
const createLandController = require("../Controllers/landDetails.Controller");
const multer = require("multer");

// Multer configuration for handling file uploads
const upload = multer({ dest: "uploads/" });

// POST request to create a new offer
router.post("/landcreate", upload.fields([{ name: "landImage", maxCount: 1 }, { name: "landDocumentation", maxCount: 1 }]), createLandController.createLand);

module.exports = router;