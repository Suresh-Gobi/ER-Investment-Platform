const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema({
  landDetails: {
    landLocation: {
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
    landArea: String,
    landDocumentation: String,
    landImage: String,
    approved: {
      type: Boolean,
      default: false,
    },
    reference: String,
  },
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
