const express = require("express");
const router = express.Router();
const {
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
router.put("/paymentupdate", updateProjectStatusAndAmount);
router.put("/paymentproject", updatePaymentDetails);
router.get("/projectgetinvestor", getInProjects);

router.get("/totalamount", getTotalPaidAmount);
router.get("/totinvestor", getTotalInPaidAmount);
router.get("/expectedAmount", getAllProjectsExpectedRevenue);

router.put("/projectupdate", updateProjectDetails);
router.get("/gettotalprojects", getTotalProjects);
router.get("/totalprojectcount", getTotalStartedProjects);

router.get("/totapproved", getTotalApprovedProjects);
router.get("/totnotapproved", getTotalNotApprovedProjects);

router.get("/getTotalPaidProjectAmount", getTotalPaidProjectAmount);

module.exports = router;
