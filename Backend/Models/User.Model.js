const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,

    unique: true,
    sparse: true,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,

    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,

    enum: ["admin", "investor", "activist", "editor"],
    default: "activist",
  },
  otp: {
    type: Number,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
