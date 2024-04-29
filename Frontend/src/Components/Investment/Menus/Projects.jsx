import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@mui/material";
import { Link } from "react-router-dom";

import MyProjects from "./ProjectDetails/myProject";
import OnGoingProjects from './ProjectDetails/ongoingProject';

export default function Projects() {
  const [projectData, setProjectData] = useState({
    projectTitle: "",
    projectCategory: "",
    projectDescription: "",
    projectTimeline: "",
    plantsToPlant: "",
    searchTags: "",
    InvestmentRange: "",
    InitialInvestment: "",
    EstimatedTotal: "",
    ExpectedRevenue: "",
    landLocation: "",
    landArea: "",
    projectDocument: "",
    reference: "",
  });

  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProjectData({ ...projectData, projectDocument: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        // Handle case where token is not found in localStorage
        console.error("Token not found in localStorage");
        return;
      }

      const formData = new FormData();
      for (let key in projectData) {
        formData.append(key, projectData[key]);
      }

      const response = await axios.post(
        "http://localhost:5000/api/project/projects",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        }
      );
      console.log(response.data);
      // Add code to handle success response (e.g., display success message)
    } catch (error) {
      console.error(error);
      // Add code to handle error response (e.g., display error message)
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{ marginRight: "130vh" }}
        >
          GO FOR A PROJECT
        </Button>

        <Button variant="contained">
          <Link to="/geo">Analysis Your GEO Location</Link>
        </Button>
      </div>

      <hr />
      <MyProjects />
      <br/><br/>
      <OnGoingProjects/>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Create Project</DialogTitle>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>
              <TextField
                label="Project Title"
                id="projectTitle"
                name="projectTitle"
                value={projectData.projectTitle}
                onChange={handleChange}
                required
                style={{ marginBottom: "10px" }}
                fullWidth
              />
            </div>
            <div>
              <TextField
                select
                label="Project Category"
                id="projectCategory"
                name="projectCategory"
                value={projectData.projectCategory}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              >
                <MenuItem value="Agriculture">Agriculture</MenuItem>
                <MenuItem value="Farming">Farming</MenuItem>
                <MenuItem value="Reforestation">Reforestation</MenuItem>
              </TextField>
            </div>
            <div>
              <TextField
                id="projectDescription"
                name="projectDescription"
                label="Project Description"
                multiline
                rows={4}
                value={projectData.projectDescription}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Project Timeline"
                id="projectTimeline"
                name="projectTimeline"
                value={projectData.projectTimeline}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Plants to Plant"
                id="plantsToPlant"
                name="plantsToPlant"
                value={projectData.plantsToPlant}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Search Tags"
                id="searchTags"
                name="searchTags"
                value={projectData.searchTags}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Investment Range"
                id="InvestmentRange"
                name="InvestmentRange"
                value={projectData.InvestmentRange}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Initial Investment"
                id="InitialInvestment"
                name="InitialInvestment"
                value={projectData.InitialInvestment}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Estimated Total"
                id="EstimatedTotal"
                name="EstimatedTotal"
                value={projectData.EstimatedTotal}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Expected Revenue"
                id="ExpectedRevenue"
                name="ExpectedRevenue"
                value={projectData.ExpectedRevenue}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Land Location"
                id="landLocation"
                name="landLocation"
                value={projectData.landLocation}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <TextField
                label="Land Area"
                id="landArea"
                name="landArea"
                value={projectData.landArea}
                onChange={handleChange}
                required
                variant="outlined"
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel htmlFor="projectDocument">
                  Project Document:
                </InputLabel>
                <Input
                  type="file"
                  id="projectDocument"
                  name="projectDocument"
                  onChange={handleFileChange}
                  required
                />
                <FormHelperText>
                  Upload your project document here
                </FormHelperText>
              </FormControl>
            </div>
            <div>
              <TextField
                id="reference"
                name="reference"
                label="Reference"
                value={projectData.reference}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
            </div>
            <div>
              <Button type="submit" variant="contained" color="primary">
                Create Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
