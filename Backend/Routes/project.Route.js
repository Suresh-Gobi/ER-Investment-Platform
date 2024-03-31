const express = require('express');
const router = express.Router();
const { upload, uploadDocument } = require('../Controllers/project.Controller');

// POST route for uploading a document
router.post('/create', upload.single('uploadFile'), uploadDocument); // Update field name here

module.exports = router;
