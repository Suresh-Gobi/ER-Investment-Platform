const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectTitle: String,
  projectCategory: String,
  projectDescription: String,
  projectTimeline: String,
  plantsToPlant: String,
  searchTags: String,
  projectDocument : String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Project", projectSchema);