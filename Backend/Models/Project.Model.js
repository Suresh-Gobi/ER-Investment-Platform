const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectTitle: String,
  projectCategory: String,
  projectDescription: String,
  projectTimeline: String,
  plant: String,
  searchTag: String,
  documentUrl: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
