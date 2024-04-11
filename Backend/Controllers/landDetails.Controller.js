const Land = require('../Models/LandDetails.Model');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (replace these values with your own)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createLand = async (req, res) => {
  try {
    const { landLocation, landArea, reference, userId } = req.body;
    const { file } = req;

    if (!landLocation || !landArea || !userId || !file) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Parse coordinates string to an object
    const [latitude, longitude] = landLocation.split(',').map(parseFloat);
    const coordinates = {
      type: 'Point',
      coordinates: [longitude, latitude] // Order is [longitude, latitude] for GeoJSON format
    };

    // Upload document to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'land-documents', // Optional: Folder in Cloudinary where the file will be stored
      resource_type: 'auto' // Auto-detect the file type
    });

    // Create new land document with parsed coordinates and Cloudinary URL
    const newLand = new Land({
      landDetails: {
        landLocation: coordinates,
        landArea,
        landDocumentation: result.secure_url, // Store the Cloudinary URL of the uploaded document
        reference,
        approved: false // Default to false
      },
      userId,
      createdAt: Date.now()
    });

    // Save the new land document
    await newLand.save();

    res.status(201).json({ message: 'Land details created successfully.', land: newLand });
  } catch (error) {
    console.error('Error creating land:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getLands = async (req, res) => {
  try {
    // Use Mongoose's find method to get all land documents
    const lands = await Land.find();

    // Send the lands as a JSON response
    res.status(200).json({ lands });
  } catch (error) {
    console.error('Error getting lands:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { createLand, getLands };
