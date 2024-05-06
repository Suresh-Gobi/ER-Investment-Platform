const Project = require("../Models/Project.Model");
const User = require("../Models/User.Model");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const secretKey = "my-secret-code";

const createProject = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
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
      projectStatus,
      paidAmount,
      startDate,
      endDate,
      duration,
      mileston,
      comments,
      investorId,
      // iot device
      deviceID,
      location,
      soilHealth,
      humidity,
      temperature,
      farmingArea,
      plantHealth,
      co2Concentration,
      h2oConcentration,

    } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

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
      projectStatus: "Pending",
      paidAmount: "0",
      investorId: "",
      startDate: "",
      endDate: "",
      duration: "",
      mileston: "",
      comments: "",
      user: userId,
       // New fields with default dummy data
       deviceID: "exampleDeviceID",
       location: {
         type: "Point",
         coordinates: [0, 0], 
       },
       soilHealth: {
         pHLevel: 7,
         nutrientLevel: {
           nitrogen: 10,
           phosphorus: 5,
           potassium: 8,
         },
         waterLevel: 50,
       },
       humidity: {
         value: 60,
       },
       temperature: {
         value: 25,
       },
       farmingArea: 1000,
       plantHealth: {
         biomass: 500,
       },
       co2Concentration: {
         value: 400,
       },
       h2oConcentration: {
         value: 100,
       },
    });

    // Save the new project to the database
    const savedProject = await newProject.save(); 

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
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    // Find projects based on the user's ID from the decoded token
    const projects = await Project.find();

    // Send the projects as a JSON response
    res.status(200).json({ projects, userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getInProjects = async (req, res) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode the token to get the investor's ID
    const decodedToken = jwt.verify(token, secretKey);
    const investorId = decodedToken.id;

    // Find projects based on the investor's ID from the decoded token
    const projects = await Project.find({ investorId });

    // Send the projects as a JSON response
    res.status(200).json({ projects, investorId });
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

const updateProjectStatusAndAmount = async (req, res) => {
  try {
    const { projectId, projectStatus, paidAmount } = req.body;

    if (!projectId || !projectStatus || !paidAmount) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { projectStatus, paidAmount },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project status and amount updated", project: updatedProject });
  } catch (error) {
    console.error("Error updating project status and amount:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updatePaymentDetails = async (req, res) => {
  try {
    const { projectId, startDate, paidAmount } = req.body;

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);

    const investorId = decodedToken.id;

    // Validate the request data
    if (!projectId || !startDate || !investorId || !paidAmount) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    // Find the project by ID
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Calculate the new paid amount by adding the existing paid amount and the new paid amount
    const newPaidAmount = parseFloat(project.paidAmount) + parseFloat(paidAmount);

    // Update the project with the new paid amount
    project.projectStatus = "Started";
    project.startDate = startDate;
    project.investorId = investorId;
    project.paidAmount = newPaidAmount.toString(); // Convert back to string

    // Save the updated project to the database
    const updatedProject = await project.save();

    res.json({ message: "Payment details updated", project: updatedProject });
  } catch (error) {
    console.error("Error updating payment details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getTotalPaidAmount = async (req, res) => {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode the token to get the user ID
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    // Find projects based on the user's ID from the decoded token
    const projects = await Project.find({ user: userId });

    // Initialize totalPaidAmount
    let totalPaidAmount = 0;

    // Iterate through projects and accumulate the paidAmount
    for (const project of projects) {
      // Ensure paidAmount is a valid number
      const paidAmount = parseFloat(project.paidAmount);
      if (!isNaN(paidAmount)) {
        totalPaidAmount += paidAmount;
      }
    }

    // Send the total paid amount as a JSON response
    res.status(200).json({ totalPaidAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTotalInPaidAmount = async (req, res) => {
  try {
    // Aggregate pipeline to calculate the total paidAmount
    const aggregateResult = await Project.aggregate([
      {
        $group: {
          _id: null,
          totalPaidAmount: { $sum: { $toDouble: "$paidAmount" } }, // Assuming paidAmount is stored as a String and needs to be converted to a number
        },
      },
    ]);

    if (aggregateResult.length > 0) {
      const totalAmount = aggregateResult[0].totalPaidAmount;
      res.json({ totalPaidAmount: totalAmount });
    } else {
      res.status(404).json({ error: "No projects found." });
    }
  } catch (error) {
    console.error("Error calculating total paid amount:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllProjectsExpectedRevenue = async (req, res) => {
  try {
    // Fetch all projects from the database
    const projects = await Project.find();

    // Calculate expected revenue for each project
    const projectsWithExpectedRevenue = projects.map(project => ({
      _id: project._id,
      projectTitle: project.projectTitle,
      projectCategory: project.projectCategory,
      EstimatedTotal: project.EstimatedTotal,
      paidAmount: project.paidAmount,
      expectedRevenue: parseInt(project.EstimatedTotal) - parseInt(project.paidAmount)
    }));

    // Send the projects with expected revenue as response
    res.status(200).json(projectsWithExpectedRevenue);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProjectDetails = async (req, res) => {
  try {
    const { projectId, startDate, endDate, duration, milestone, comments } = req.body;

    // Validate request data
    if (!projectId) {
      return res.status(400).json({ message: "Project ID is required" });
    }

    // Find and update the project by ID
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { startDate, endDate, duration, milestone, comments },
      { new: true }
    );

    // Check if the project was found and updated successfully
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Send the updated project as the response
    res.json({ message: "Project details updated", project: updatedProject });
  } catch (error) {
    console.error("Error updating project details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalProjects = async (req, res) => {
  try {
    // Perform aggregation to count total projects
    const totalProjects = await Project.countDocuments();

    // Send the totalProjects as a JSON response
    res.status(200).json({ totalProjects });
  } catch (error) {
    console.error("Error fetching total projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getTotalStartedProjects = async (req, res) => {
  try {
    // Perform aggregation to count total started projects
    const totalStartedProjects = await Project.aggregate([
      {
        $match: { projectStatus: "Started" }
      },
      {
        $count: "totalStartedProjects"
      }
    ]);

    // Extract the total count from the aggregation result
    const totalCount = totalStartedProjects.length > 0 ? totalStartedProjects[0].totalStartedProjects : 0;

    // Send the totalCount as a JSON response
    res.status(200).json({ totalCount });
  } catch (error) {
    console.error("Error fetching total started projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalApprovedProjects = async (req, res) => {
  try {
    // Perform aggregation to count total approved projects
    const totalApprovedProjects = await Project.aggregate([
      {
        $match: { "landDetails.approved": true }
      },
      {
        $count: "totalApprovedProjects"
      }
    ]);

    // Extract the total count from the aggregation result
    const totalCount = totalApprovedProjects.length > 0 ? totalApprovedProjects[0].totalApprovedProjects : 0;

    // Send the totalCount as a JSON response
    res.status(200).json({ totalCount });
  } catch (error) {
    console.error("Error fetching total approved projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalNotApprovedProjects = async (req, res) => {
  try {
    // Perform aggregation to count total not approved projects
    const totalNotApprovedProjects = await Project.aggregate([
      {
        $match: { "landDetails.approved": false }
      },
      {
        $count: "totalNotApprovedProjects"
      }
    ]);

    // Extract the total count from the aggregation result
    const totalCount = totalNotApprovedProjects.length > 0 ? totalNotApprovedProjects[0].totalNotApprovedProjects : 0;

    // Send the totalCount as a JSON response
    res.status(200).json({ totalCount });
  } catch (error) {
    console.error("Error fetching total not approved projects:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTotalPaidProjectAmount = async (req, res) => {
  try {
    // Perform aggregation to calculate the total paidAmount
    const totalPaidAmount = await Project.aggregate([
      {
        $group: {
          _id: null,
          totalPaidAmount: { $sum: { $toDouble: "$paidAmount" } }
        }
      }
    ]);

    // Extract the total paidAmount from the aggregation result
    const totalCount = totalPaidAmount.length > 0 ? totalPaidAmount[0].totalPaidAmount : 0;

    // Send the totalCount as a JSON response
    res.status(200).json({ totalCount });
  } catch (error) {
    console.error("Error fetching total paidAmount:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProject,
  getProjects,
  getAllProjects,
  updateApprovalStatus,
  updateProjectStatusAndAmount,
  updatePaymentDetails,
  getTotalPaidAmount,
  getInProjects,
  getTotalInPaidAmount,
  getAllProjectsExpectedRevenue,
  updateProjectDetails,
  getTotalProjects,
  getTotalStartedProjects,
  getTotalApprovedProjects,
  getTotalNotApprovedProjects,
  getTotalPaidProjectAmount,
};
