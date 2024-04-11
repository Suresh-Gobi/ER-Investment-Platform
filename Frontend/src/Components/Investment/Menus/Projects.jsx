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

      const response = await axios.post("http://localhost:5000/api/project/projects", formDataToSend);

      console.log("Project created successfully:", response.data);

      handleClose();
    } catch (error) {
      console.error("Error creating project:", error);
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
              {getStepContent(activeStep)}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button onClick={activeStep === steps.length - 1 ? handleCreateProject : handleNext}>
            {activeStep === steps.length - 1 ? "Create" : "Next"}
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
      return "Step 2 content";
    case 2:
      return "Step 3 content";
    default:
      return "Unknown step";
  }
}

const steps = ["Step 1", "Step 2", "Step 3"];
