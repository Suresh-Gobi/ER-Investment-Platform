const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  InvestmentRange: String,
  InitialInvestment: String,
  EstimatedTotal: String,
  ExpectedRevenue: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
