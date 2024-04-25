// Importing mongoose and defining the schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Payment schema
const paymentSchema = new Schema({
  amount: {
    type: Number,
  },
  currency: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
  },
  paymentIntentId: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Add more fields as needed
});

// Create the Payment model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
