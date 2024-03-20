const { check, validationResult } = require("express-validator");
const AccountVerification = require("../Models/AccountVerification");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST route for creating a new account verification
exports.createAccountVerification = async (req, res) => {
  try {
    // Define validation rules
    const validationRules = [
      check("fullName").notEmpty().withMessage("Full name is required"),
      check("address").notEmpty().withMessage("Address is required"),
      check("phoneNumber").notEmpty().withMessage("Phone number is required"),
      check("nic").notEmpty().withMessage("NIC is required"),
      check("dob").notEmpty().withMessage("Date of birth is required"),
      check("nationality").notEmpty().withMessage("Nationality is required"),
      check("bankDetails").notEmpty().withMessage("Bank details are required"),
      check("verifiedAccount").isBoolean().withMessage("Verified account must be a boolean"),
      check("userId").notEmpty().withMessage("User ID is required"),
      // Add validation for files (optional):
      check("nicCopy").custom((value, { req }) => {
        if (!req.files || !req.files["nicCopy"]) {
          throw new Error("NIC copy is required");
        }
        // You can add further validation for file size, format, etc.
        return true;
      }),
    ];

    // Validate request body
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({ errors: validationErrors.array() });
    }

    // Check if the required file uploads are present in the request
    if (!req.files || !req.files["nicCopy"] || !req.files["bankBookCopy"]) {
      return res.status(400).json({ message: "Missing file uploads" });
    }
    console.log("req.files:", req.files);

    // Extract data from request body
    const {
      fullName,
      address,
      phoneNumber,
      nic,
      dob,
      nationality,
      bankDetails,
      verifiedAccount,
      userId,
    } = req.body;

    // Upload files to Cloudinary and handle any errors
    let nicCopyUpload, bankBookCopyUpload;
    try {
      // Upload NIC Copy
      nicCopyUpload = await cloudinary.uploader.upload(
        req.files["nicCopy"][0].path,
        {
          folder: "nicCopies",
          allowed_formats: ["png"], // Allow only PNG files
        }
      );
      // Upload Bank Book Copy
      bankBookCopyUpload = await cloudinary.uploader.upload(
        req.files["bankBookCopy"][0].path,
        {
          folder: "bankBookCopies",
          allowed_formats: ["png"], // Allow only PNG files
        }
      );
    } catch (uploadError) {
      console.error("Error uploading files:", uploadError);
      return res.status(500).json({ message: "Error uploading files" });
    }

    // Create account verification
    const newVerification = await AccountVerification.create({
      fullName,
      address,
      phoneNumber,
      nic,
      dob,
      nationality,
      bankDetails,
      nicCopy: nicCopyUpload.secure_url,
      bankBookCopy: bankBookCopyUpload.secure_url,
      verifiedAccount,
      user: userId,
    });

    res.status(201).json({
      message: "Account verification created successfully",
      data: newVerification,
    });
  } catch (error) {
    console.error("Error creating account verification:", error);
    res.status(500).json({ message: "Server error" });
  }
};
