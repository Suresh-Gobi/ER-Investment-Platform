import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection
import axios from 'axios';

export default function InvestorLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const history = useHistory(); // Initialize useHistory for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/investor/login', formData);
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Redirect to "/investordash"
      history.push('/investordash');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h1>Investor Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
