const Project = require("../Models/Project.Model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createProject = async (req, res) => {
  try {
    const {
      projectTitle,
      projectCategory,
      projectDescription,
      projectTimeline,
      plantsToPlant,
      searchTags,
      userId,
    } = req.body;

    // Upload projectDocument to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new project with Cloudinary URL
    const newProject = new Project({
      projectTitle,
      projectCategory,
      projectDescription,
      projectTimeline,
      plantsToPlant,
      searchTags,
      projectDocument: result.secure_url,
      user: userId,
    });

    await newProject.save();

    res.status(201).json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getProjects = async (req, res) => {
  try {
    // Use Mongoose's find method to get all projects
    const projects = await Project.find();

    // Send the projects as a JSON response
    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { createProject, getProjects };
