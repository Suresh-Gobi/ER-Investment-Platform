const mongoose = require("mongoose");

const uploadSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phoneNumber: String,
  nic: String,
  dob: Date,
  nationality: String,
  bankName: String,
  accountNumber: String,
  branch: String,
  bankCode: String,
  swiftCode: String,
  verifiedAccount: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  documentUrl: String,
});

module.exports = mongoose.model("Upload", uploadSchema);
