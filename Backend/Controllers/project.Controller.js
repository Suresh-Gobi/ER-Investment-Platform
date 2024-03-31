const multer = require("multer");
const Project = require("../Models/Project.Model"); // Assuming correct import path for Project model
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Extract user ID from Authorization header token
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const result = await cloudinary.uploader.upload(req.file.path);

    const {
      projectTitle,
      projectCategory,
      projectDescription,
      projectTimeline,
      plant,
      searchTag,
    } = req.body;
    const documentUrl = result.secure_url;

    const newProject = new Project({
      projectTitle,
      projectCategory,
      projectDescription,
      projectTimeline,
      plant,
      searchTag,
      documentUrl,
      user: userId, // Assuming userId is the correct field to reference the user
    });

    await newProject.save();

    return res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { upload, uploadDocument };
