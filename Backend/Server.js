const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('./Utils/passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authRoutes = require('./Routes/auth.Route');

const app = express();
require('dotenv').config();

// Use CORS middleware
app.use(cors({ origin: '*' }));

// Connect to MongoDB using URI from environment variables
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

// Event listeners for MongoDB connection
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Body parser middleware
app.use(bodyParser.json());

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

// Set up Socket.io connection
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("A user connected");
  // Handle disconnect if needed
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
