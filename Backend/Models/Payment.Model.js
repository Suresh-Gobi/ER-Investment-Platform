// Importing mongoose and defining the schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Payment schema
const paymentSchema = new Schema({
  amount: Number,
  userId: String,
  projectTitle: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
