const multer = require("multer");
const Upload = require("../Models/upload");
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
      name,
      email,
      address,
      phoneNumber,
      nic,
      dob,
      nationality,
      bankName,
      accountNumber,
      branch,
      bankCode,
      swiftCode,
      verifiedAccount,
    } = req.body;
    const documentUrl = result.secure_url;

    const newUpload = new Upload({
      name,
      email,
      address,
      phoneNumber,
      nic,
      dob,
      nationality,
      bankName,
      accountNumber,
      branch,
      bankCode,
      swiftCode,
      verifiedAccount: false,
      documentUrl,
      userId,
    });

    await newUpload.save();

    return res
      .status(201)
      .json({ message: "File uploaded successfully", upload: newUpload });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllDetails = async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.status(200).json(uploads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports = { upload, uploadDocument, getAllDetails };
