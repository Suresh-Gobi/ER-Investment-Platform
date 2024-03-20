const mongoose = require("mongoose");

const accountVerificationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  bankDetails: {
    type: {
      bankName: String,
      accountNumber: String,
      branch: String,
      bankCode: String,
      shiftCode: String,
    },
    required: true,
  },
  nicCopy: {
    type: String,
    // required: true,
  },
  bankBookCopy: {
    type: String,
    // required: true,
  },
  verifiedAccount: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const AccountVerification = mongoose.model(
  "AccountVerification",
  accountVerificationSchema
);

module.exports = AccountVerification;
