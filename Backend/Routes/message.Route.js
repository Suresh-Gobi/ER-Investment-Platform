const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/message.Controller'); // Import the message controller

// Handle incoming messages (POST request)
router.post('/', (req, res) => {
  const data = req.body;
  messageController.handleMessage(data);
  res.status(200).send('Message received and processed');
});

// Get messages from the database (GET request)
router.get('/', async (req, res) => {
  try {
    const messages = await messageController.getMessages(); // Call the getMessages function in the controller
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Error fetching messages');
  }
});

module.exports = router;
