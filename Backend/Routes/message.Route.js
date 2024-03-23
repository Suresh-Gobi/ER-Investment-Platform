// Routes/messageRoute.js
const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/message.Controller'); // Import the message controller

// Handle incoming messages
router.post('/', (req, res) => {
  const data = req.body;
  messageController.handleMessage(data);
  res.status(200).send('Message received and processed');
});

module.exports = router;
