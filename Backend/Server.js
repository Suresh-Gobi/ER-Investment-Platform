const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const projectRoutes = require('./routes/projectRoutes');

const app = express();
require('dotenv').config();

app.use(cors({ origin: '*' }));
const server = http.createServer(app);
const io = socketIO(server);

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
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Configure Google OAuth2 Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    // You can create or retrieve a user from the database here
    // For demonstration, let's assume we're using the profile information directly
    return done(null, profile);
  }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Use routes
app.use('/api/projects', projectRoutes);

// Set up Socket.io connection
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
  // Add MongoDB connected message here
  console.log("Connecting to MongoDB...");
});
