// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./Utils/passport');
const authRoutes = require('./Routes/auth.Route');
const uploadRoutes = require('./Routes/uploadRoutes');
const messageRoutes = require('./Routes/message.Route');
const messageController = require('./Controllers/message.Controller');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Use CORS middleware with origin configuration (adjust as needed)
app.use(cors({ origin: ['http://localhost:5173'] })); // Replace with your frontend's origin

// Connect to MongoDB using URI from environment variables
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
  .then(() => console.log("MongoDB database connection established successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET, // Use a secure secret
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport middleware
passport(app);

// Use authentication routes
app.use('/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/messages', messageRoutes);

// Set up Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  // Initialize io object in messageController
  messageController.init(io);
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
