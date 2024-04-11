const express = require("express");
const router = express.Router();
const { createLand } = require("../Controllers/landDetails.Controller");
const multer = require("multer");

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination directory for file uploads
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name for uploaded files
  },
});

const upload = multer({ storage: storage });

// POST request to create a new land record
router.post("/landcreate", upload.single("landDocumentation"), createLand);

module.exports = router;
