const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  proposalTitle: {
    type: String,
    required: true
  },
  proposalDescription: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
