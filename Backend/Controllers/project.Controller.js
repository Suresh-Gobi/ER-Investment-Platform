const Project = require("../Models/Project.Model");
const User = require("../Models/User.Model");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createProject = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId; // Extracted userId from the token

    // Destructure relevant fields from req.body
    const {
      projectTitle,
      projectCategory,
      projectDescription,
      projectTimeline,
      plantsToPlant,
      searchTags,
      InvestmentRange,
      InitialInvestment,
      EstimatedTotal,
      ExpectedRevenue,
      landLocation,
      landArea,
      projectDocument,
      reference,
    } = req.body;

    // Upload projectDocument to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new project with Cloudinary URL and extracted userId
    const newProject = new Project({
      projectTitle,
      projectCategory,
      projectDescription,
      projectTimeline,
      plantsToPlant,
      searchTags,
      InvestmentRange,
      InitialInvestment,
      EstimatedTotal,
      ExpectedRevenue,
      landDetails: {
        landLocation,
        landArea,
        projectDocument: result.secure_url,
        approved: false,
        reference,
      },
      user: userId, // Assign extracted userId to the new project
    });

    // Save the new project to the database
    await newProject.save();

    // Send success response
    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


const getProjects = async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode the token to get the user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    // Find projects based on the user's ID from the decoded token
    const projects = await Project.find({ user: userId });

    // Send the projects as a JSON response
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find().populate('user', 'username email');

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

module.exports = { createProject, getProjects, getAllProjects };
