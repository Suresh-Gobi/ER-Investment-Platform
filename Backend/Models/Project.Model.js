const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  projectCategory: {
    type: String,
    enum: ['Agriculture', 'Information Technology', 'Health', 'Education', 'Religious'],
    required: true
  },
  projectTimeline: {
    type: Date,
    required: true
  },
  role: {
    type: String,
    enum: ['Environment Activist', 'Investor', 'Project Owner', 'Administrator', 'Editor'],
    required: true
  },
  ProjectStatus: {
    type: String,
    enum: ['Hold', 'On Going', ''],
  },
  proposalRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proposal'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
