const Project = require("../Models/Project.Model");
const User = require("../Models/User.Model");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const secretKey = 'my-secret-code';

const createProject = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secretKey);

    const userId = decodedToken.id;

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
      user: userId,
    });

    // Save the new project to the database
    const savedProject = await newProject.save(); // Save the project and capture the result

    // Send success response with the saved project
    res
      .status(201)
      .json({ message: "Project created successfully", project: savedProject });
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
    const projects = await Project.find().populate("user", "username email");

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

const updateApprovalStatus = async (req, res) => {
  try {
    // Extract project ID and new approval status from request body
    const { projectId, approved } = req.body;

    // Validate project ID and approval status
    if (!projectId || typeof approved !== "boolean") {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Find the project by ID and update the "approved" field
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { "landDetails.approved": approved },
      { new: true }
    );

    // Check if the project was found and updated successfully
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Send the updated project as the response
    res.json({ message: "Approval status updated", project: updatedProject });
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating approval status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getAllProjects,
  updateApprovalStatus,
};
