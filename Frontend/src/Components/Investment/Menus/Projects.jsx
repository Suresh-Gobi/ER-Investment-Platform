import React, { useState } from 'react';
import axios from 'axios';

export default function Projects() {
  const [projectData, setProjectData] = useState({
    projectTitle: '',
    projectCategory: '',
    projectDescription: '',
    projectTimeline: '',
    plantsToPlant: '',
    searchTags: '',
    InvestmentRange: '',
    InitialInvestment: '',
    EstimatedTotal: '',
    ExpectedRevenue: '',
    landLocation: '',
    landArea: '',
    projectDocument: '', // Assuming file upload for project document
    reference: '',
  });

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
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (!token) {
        // Handle case where token is not found in localStorage
        console.error('Token not found in localStorage');
        return;
      }

      const formData = new FormData();
      for (let key in projectData) {
        formData.append(key, projectData[key]);
      }

      const response = await axios.post('http://localhost:5000/api/project/projects', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      });
      console.log(response.data);
      // Add code to handle success response (e.g., display success message)
    } catch (error) {
      console.error(error);
      // Add code to handle error response (e.g., display error message)
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectTitle">Project Title:</label>
          <input
            type="text"
            id="projectTitle"
            name="projectTitle"
            value={projectData.projectTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="projectCategory">Project Category:</label>
          <input
            type="text"
            id="projectCategory"
            name="projectCategory"
            value={projectData.projectCategory}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="projectDescription">Project Description:</label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={projectData.projectDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="projectTimeline">Project Timeline:</label>
          <input
            type="text"
            id="projectTimeline"
            name="projectTimeline"
            value={projectData.projectTimeline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="plantsToPlant">Plants to Plant:</label>
          <input
            type="text"
            id="plantsToPlant"
            name="plantsToPlant"
            value={projectData.plantsToPlant}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="searchTags">Search Tags:</label>
          <input
            type="text"
            id="searchTags"
            name="searchTags"
            value={projectData.searchTags}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="InvestmentRange">Investment Range:</label>
          <input
            type="text"
            id="InvestmentRange"
            name="InvestmentRange"
            value={projectData.InvestmentRange}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="InitialInvestment">Initial Investment:</label>
          <input
            type="text"
            id="InitialInvestment"
            name="InitialInvestment"
            value={projectData.InitialInvestment}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="EstimatedTotal">Estimated Total:</label>
          <input
            type="text"
            id="EstimatedTotal"
            name="EstimatedTotal"
            value={projectData.EstimatedTotal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ExpectedRevenue">Expected Revenue:</label>
          <input
            type="text"
            id="ExpectedRevenue"
            name="ExpectedRevenue"
            value={projectData.ExpectedRevenue}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="landLocation">Land Location:</label>
          <input
            type="text"
            id="landLocation"
            name="landLocation"
            value={projectData.landLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="landArea">Land Area:</label>
          <input
            type="text"
            id="landArea"
            name="landArea"
            value={projectData.landArea}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="projectDocument">Project Document:</label>
          <input
            type="file"
            id="projectDocument"
            name="projectDocument"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reference">Reference:</label>
          <input
            type="text"
            id="reference"
            name="reference"
            value={projectData.reference}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Create Project</button>
        </div>
      </form>
    </div>
  );
}
