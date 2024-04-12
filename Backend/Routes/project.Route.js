const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getAllProjects,
  updateApprovalStatus,
} = require("../Controllers/project.Controller");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Multer upload middleware using the storage configuration
const upload = multer({ storage: storage });

// Route to handle project creation with file upload
router.post("/projects", upload.single("projectDocument"), createProject);
router.get("/projectget", getProjects);
router.get("/projectadminget", getAllProjects);
router.put("/projects/:projectId/approval", updateApprovalStatus);

module.exports = router;
