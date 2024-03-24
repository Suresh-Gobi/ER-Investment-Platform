// Controllers/messageController.js
const Message = require('../Models/Message.Model'); // Import the Message model

let io; // Socket.io instance

// Initialize the Socket.io object
function init(socketIo) {
  io = socketIo;
}

// Handle incoming messages
function handleMessage(data) {
    if (!data.sender || !data.recipient) {
      console.error('Sender and recipient are required');
      return;
    }
  
    // Save the message to the database
    const newMessage = new Message({
      sender: data.sender,
      content: data.content,
      recipient: data.recipient
    });
    newMessage.save()
      .then(() => {
        console.log('Message saved to the database');
        // Broadcast the message to all connected clients (including sender)
        io.emit('message', data);
      })
      .catch(err => {
        console.error('Error saving message:', err);
      });
  }

  async function getMessages(criteria = {}) {
    try {
      const messages = await Message.find(criteria).exec();
      return messages;
    } catch (err) {
      console.error('Error fetching messages:', err);
      return [];
    }
  }
  

module.exports = {
  init,
  handleMessage,
  getMessages
};
