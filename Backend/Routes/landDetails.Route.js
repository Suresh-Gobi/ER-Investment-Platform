const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createLand } = require("../Controllers/landDetails.Controller");

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" }); // Destination folder for uploaded files

// POST request to create a new land record
router.post("/landcreate", upload.single("landDocumentation"), createLand);

module.exports = router;
