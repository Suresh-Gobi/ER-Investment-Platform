// routes.js
const express = require('express');
const router = express.Router();
const { upload, uploadDocument } = require('../Controllers/uploadController');

// POST route for uploading a document
router.post('/upload', upload.single('file'), uploadDocument);

module.exports = router;