const mongoose = require("mongoose");

const landSchema = new mongoose.Schema({
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

const Land = mongoose.model("Land", landSchema);

module.exports = Land;
