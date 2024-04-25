const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectTitle: String,
  projectCategory: String,
  projectDescription: String,
  projectTimeline: String,
  plantsToPlant: String,
  searchTags: String,

  InvestmentRange: String,
  InitialInvestment: String,
  EstimatedTotal: String,
  ExpectedRevenue: String,

  landDetails: {
    landLocation: String,
    landArea: String,
    projectDocument : String,
    approved: {
      type: Boolean,
      default: false,
    },
    reference: String,
  },

  projectStatus: String,
  paidAmount: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Project", projectSchema);