// Import necessary components from MUI and React
import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Define project categories
const projectCategories = ["Reforestation", "Agriculture", "Plantation"];

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectCategory: "",
    projectDescription: "",
    projectTimeline: "",
    plantsToPlant: "",
    searchTags: "",
    projectDocument: null, // Add projectDocument field
    investRange: "",
    initialInvestment: "",
    estimatedTotalExpensive: "",
    expectedRevenue: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setFormData({
      projectTitle: "",
      projectCategory: "",
      projectDescription: "",
      projectTimeline: "",
      plantsToPlant: "",
      searchTags: "",
      projectDocument: null, // Reset projectDocument field
      investRange: "",
      initialInvestment: "",
      estimatedTotalExpensive: "",
      expectedRevenue: "",
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateProject = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("projectTitle", formData.projectTitle);
      formDataToSend.append("projectCategory", formData.projectCategory);
      formDataToSend.append("projectDescription", formData.projectDescription);
      formDataToSend.append("projectTimeline", formData.projectTimeline);
      formDataToSend.append("plantsToPlant", formData.plantsToPlant);
      formDataToSend.append("searchTags", formData.searchTags);
      formDataToSend.append("projectDocument", formData.projectDocument); // Append projectDocument to FormData

      const response = await axios.post(
        "http://localhost:5000/api/project/projects",
        formDataToSend
      );

      console.log("Project created successfully:", response.data);

      handleClose();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleCreateOffer = async () => {
    try {
      const {
        investRange,
        initialInvestment,
        estimatedTotalExpensive,
        expectedRevenue,
      } = formData;

      const offerData = {
        InvestmentRange: investRange,
        InitialInvestment: initialInvestment,
        EstimatedTotal: estimatedTotalExpensive,
        ExpectedRevenue: expectedRevenue,
        userId: "65fead563078cdddb0119031",
      };

      const response = await axios.post(
        "http://localhost:5000/api/offers/offercreate",
        offerData
      );

      console.log("Offer created successfully:", response.data);

      handleClose();
    } catch (error) {
      console.error("Error creating offer:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the input is a file input (projectDocument), set formData differently
    if (name === "projectDocument") {
      setFormData((prevData) => ({
        ...prevData,
        projectDocument: files[0], // Set projectDocument to the selected file
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <div>
      <Card sx={{ maxWidth: 400, margin: "20px", marginTop: "20px" }}>
        <CardContent onClick={handleOpen} style={{ cursor: "pointer" }}>
          <Typography variant="h5" component="div">
            Create New Project
          </Typography>
          <AddIcon />
        </CardContent>
      </Card>
      <Dialog open={open} onClose={handleClose} fullScreen>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === 0 && (
                <form encType="multipart/form-data">
                  <TextField
                    label="Project Title"
                    name="projectTitle"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    select
                    label="Project Category"
                    name="projectCategory"
                    value={formData.projectCategory}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    {projectCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Project Description"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    type="date"
                    label="Project Timeline"
                    name="projectTimeline"
                    value={formData.projectTimeline}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Plants to Plant"
                    name="plantsToPlant"
                    value={formData.plantsToPlant}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Search Tags"
                    name="searchTags"
                    value={formData.searchTags}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <input
                    type="file"
                    name="projectDocument"
                    onChange={handleChange}
                    style={{ marginTop: "16px" }}
                  />
                </form>
              )}
              {activeStep === 1 && (
                <form>
                  <TextField
                    select
                    label="Invest Range"
                    name="investRange"
                    value={formData.investRange}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    {investRanges.map((range) => (
                      <MenuItem key={range} value={range}>
                        {range}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Initial Investment"
                    name="initialInvestment"
                    value={formData.initialInvestment}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  >
                    {initialInvestments.map((investment) => (
                      <MenuItem key={investment} value={investment}>
                        {investment}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    label="Estimated Total Expensive"
                    name="estimatedTotalExpensive"
                    value={formData.estimatedTotalExpensive}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Expected Revenue"
                    name="expectedRevenue"
                    value={formData.expectedRevenue}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                </form>
              )}
              {activeStep === 2 && (
                <form>
                  <TextField
                    label="Land Location (Latitude, Longitude)"
                    name="landLocation"
                    value={formData.landLocation}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Land Area"
                    name="landArea"
                    value={formData.landArea}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Land Documentation"
                    name="landDocumentation"
                    value={formData.landDocumentation}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                  />
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    style={{ marginTop: "16px" }}
                  />
                </form>
              )}
              {getStepContent(activeStep)}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button
            onClick={
              activeStep === steps.length - 1
                ? handleCreateOffer
                : () => handleNext()
            }
          >
            {activeStep === steps.length - 1 ? "Create Offer" : "Next"}
          </Button>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            onClick={
              activeStep === steps.length - 1 ? handleCreateProject : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Create Project" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return null;
    case 1:
      return (
        <div>
          <Typography variant="h6" gutterBottom>
            Step 2 content
          </Typography>
          {/* Your step 2 form */}
        </div>
      );
    case 2:
      return (
        <div>
          <Typography variant="h6" gutterBottom>
            Step 3 content
          </Typography>
          {/* Your step 2 form */}
        </div>
      );
    default:
      return "Unknown step";
  }
}

const steps = ["Step 1", "Step 2", "Step 3"];
const investRanges = ["Low", "Medium", "High"];
const initialInvestments = ["$50", "$100", "$200", "$300"];
