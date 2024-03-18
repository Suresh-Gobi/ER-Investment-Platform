const express = require('express');
const cloudinary = require('cloudinary').v2;
const { validationResult } = require('express-validator');
const AccountVerification = require('../Models/AccountVerification');

const router = express.Router();

// Configure Cloudinary credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// POST route for creating a new account verification
exports.createAccountVerification = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract data from request body
    const { fullName, address, phoneNumber, nic, dob, nationality, bankDetails, verifiedAccount, userId } = req.body;

    // Upload files to Cloudinary
    const nicCopyUpload = await cloudinary.uploader.upload(req.files['nicCopy'][0].path, {
      folder: 'nicCopies', // Optional: specify a folder in Cloudinary
    });
    const bankBookCopyUpload = await cloudinary.uploader.upload(req.files['bankBookCopy'][0].path, {
      folder: 'bankBookCopies', // Optional: specify a folder in Cloudinary
    });

    // Create account verification
    const newVerification = await AccountVerification.create({
      fullName,
      address,
      phoneNumber,
      nic,
      dob,
      nationality,
      bankDetails,
      nicCopy: nicCopyUpload.secure_url, // Cloudinary file URL
      bankBookCopy: bankBookCopyUpload.secure_url, // Cloudinary file URL
      verifiedAccount,
      user: userId,
    });

    res.status(201).json({ message: 'Account verification created successfully', data: newVerification });
  } catch (error) {
    console.error('Error creating account verification:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = router;
