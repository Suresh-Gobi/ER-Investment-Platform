import React, { useState } from "react";
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
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Projects() {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveStep(0); // Reset to the first step when closing the dialog
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateProject = () => {
    // Implement logic to create a new project
    console.log("Creating new project...");
    handleClose(); // Close the modal after creating the project
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
            <div>{getStepContent(activeStep)}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button> {/* Close button */}
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            onClick={
              activeStep === steps.length - 1 ? handleCreateProject : handleNext
            }
          >
            {activeStep === steps.length - 1 ? "Create" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// Define the steps and their content
function getStepContent(step) {
  switch (step) {
    case 0:
      return "Step 1 content";
    case 1:
      return "Step 2 content";
    case 2:
      return "Step 3 content";
    default:
      return "Unknown step";
  }
}

const steps = ["Step 1", "Step 2", "Step 3"]; // Define step titles
