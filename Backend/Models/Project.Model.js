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

  //Project Payment
  projectStatus: String,
  paidAmount: String,
  investorId: String,

  // Project Progress
  startDate: String,
  endDate: String,
  duration: String,
  mileston: String,
  comments: String,

  // Project land analyze live with iot device
  deviceID: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  soilHealth: {
    pHLevel: Number,
    nutrientLevel: {
      nitrogen: Number,
      phosphorus: Number,
      potassium: Number,
    },
    waterLevel: Number,
  },
  humidity: {
    value: Number,
    unit: {
      type: String,
      default: "%",
    },
  },
  temperature: {
    value: Number,
    unit: {
      type: String,
      default: "°C",
    },
  },
  farmingArea: {
    type: Number,
  },
  plantHealth: {
    biomass: Number,
  },
  co2Concentration: {
    value: Number,
    unit: {
      type: String,
      default: "ppm",
    },
  },
  h2oConcentration: {
    value: Number,
    unit: {
      type: String,
      default: "ppm",
    },
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Project", projectSchema);