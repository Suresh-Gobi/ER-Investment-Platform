const express = require("express");
const router = express.Router();
const createEntityController = require("../Controllers/combine");

// Route to handle entity creation with file uploads
router.post("/create-entity", createEntityController.createEntity);

module.exports = router;
