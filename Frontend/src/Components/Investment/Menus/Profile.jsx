import React, { useState } from 'react';
import axios from 'axios';

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
            Authorization: `Bearer ${token}`, // Attach the JWT token in the Authorization header
          },
        }
      );
      console.log(response.data);
      // Add any additional handling or redirect logic here
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="text" name="nic" value={formData.nic} onChange={handleChange} placeholder="NIC" required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Date of Birth" required />
        <input type="text" name="nation" value={formData.nation} onChange={handleChange} placeholder="Nationality" required />
        <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} placeholder="Bank Name" required />
        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account Number" required />
        <input type="text" name="branch" value={formData.branch} onChange={handleChange} placeholder="Branch" required />
        <input type="text" name="bankCode" value={formData.bankCode} onChange={handleChange} placeholder="Bank Code" required />
        <input type="text" name="shiftCode" value={formData.shiftCode} onChange={handleChange} placeholder="Shift Code" required />
        <div>
          <label>
            Verified Account:
            <input type="checkbox" name="verifiedAccount" checked={formData.verifiedAccount} onChange={(e) => setFormData({ ...formData, verifiedAccount: e.target.checked })} />
          </label>
        </div>
        <input type="file" name="file" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
