const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  name: String,
  email: String,
  documentUrl: String,
});

module.exports = mongoose.model('Upload', uploadSchema);
