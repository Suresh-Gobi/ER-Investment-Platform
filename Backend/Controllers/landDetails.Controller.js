const Land = require("../Models/LandDetails");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createLand = async (req, res) => {
  try {
    const {
      landLocation,
      landArea,
      userId,
      reference,
    } = req.body;

    // Upload landImage and landDocumentation to Cloudinary
    const landImageResult = await cloudinary.uploader.upload(req.files.landImage.path);
    const landDocResult = await cloudinary.uploader.upload(req.files.landDocumentation.path);

    // Create new offer with Cloudinary URLs for landImage and landDocumentation
    const newLand = new Land({
      landDetails: {
        landLocation,
        landArea,
        landImage: landImageResult.secure_url,
        landDocumentation: landDocResult.secure_url,
        approved: false,
        reference,
      },
      userId,
    });

    await newLand.save();

    res.status(201).json({ message: "Offer created successfully", offer: newOffer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createLand };
