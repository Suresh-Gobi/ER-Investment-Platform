import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Checkbox, Button, Grid, FormControlLabel } from '@mui/material';

export default function Profile() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    nic: '',
    dob: '',
    nation: '',
    bankName: '',
    accountNumber: '',
    branch: '',
    bankCode: '',
    shiftCode: '',
    verifiedAccount: false,
    file: null,
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('nic', formData.nic);
    formDataToSend.append('dob', formData.dob);
    formDataToSend.append('nation', formData.nation);
    formDataToSend.append('bankName', formData.bankName);
    formDataToSend.append('accountNumber', formData.accountNumber);
    formDataToSend.append('branch', formData.branch);
    formDataToSend.append('bankCode', formData.bankCode);
    formDataToSend.append('shiftCode', formData.shiftCode);
    formDataToSend.append('verifiedAccount', formData.verifiedAccount);
    formDataToSend.append('file', formData.file);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/uploads/upload',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);


      alert('File uploaded successfully!');
      
      // Add any additional handling or redirect logic here
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Network Error:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
      }
      // Handle error display or any other logic
    }
    
  };

  return (
    <div>
      <h1>Profile</h1>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              label="Address"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              label="Phone"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleChange}
              label="NIC"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              label="Date of Birth"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="text"
              name="nation"
              value={formData.nation}
              onChange={handleChange}
              label="Nationality"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              label="Bank Name"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              label="Account Number"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              label="Branch"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="bankCode"
              value={formData.bankCode}
              onChange={handleChange}
              label="Bank Code"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="shiftCode"
              value={formData.shiftCode}
              onChange={handleChange}
              label="Shift Code"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="verifiedAccount"
                  checked={formData.verifiedAccount}
                  onChange={(e) =>
                    setFormData({ ...formData, verifiedAccount: e.target.checked })
                  }
                />
              }
              label="Verified Account"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              htmlFor="fileInput"
            >
              Upload File
              <input
                type="file"
                id="fileInput"
                name="file"
                onChange={handleChange}
                required
                style={{ display: 'none' }}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>

            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <div>
              {/* <p>Submitted you documents</p> */}
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
