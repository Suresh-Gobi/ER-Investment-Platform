

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const locationRoutes = require("./Routes/Location.routes");

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

// Use routes
// app.use("/api/location", locationRoutes);

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
