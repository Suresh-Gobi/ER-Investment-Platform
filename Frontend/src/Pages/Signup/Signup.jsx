import React, { useState } from 'react';
import { Button, Card, CardContent, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const roles = ['investor', 'activist'];

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [apiMessage, setApiMessage] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Clear any previous error messages
    setError('');

    // Handle signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    // Send signup request to API
    fetch('http://localhost:5000/auth/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, role }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Signup failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Signup successful:', data);
        // Set the API return message
        setApiMessage(data.message);
      })
      .catch((error) => {
        console.error('Error signing up:', error);
        // Handle signup error (e.g., display error message)
        setError('Error signing up: ' + error.message);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', marginTop: '100', textAlign: 'center', padding: '20px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>Sign Up</Typography>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            labelId="role-label"
            id="role"
            value={role}
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <MenuItem key={r} value={r}>{r}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ m: 1, minWidth: 300 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ m: 1, minWidth: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityOff onClick={handleShowPassword} />
                ) : (
                  <Visibility onClick={handleShowPassword} />
                )}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type={showPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{ m: 1, minWidth: 300 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? (
                  <VisibilityOff onClick={handleShowPassword} />
                ) : (
                  <Visibility onClick={handleShowPassword} />
                )}
              </InputAdornment>
            ),
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        {apiMessage && <Typography>{apiMessage}</Typography>}
        <Button variant="contained" onClick={handleSignup}>Sign Up</Button>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </CardContent>
    </Card>
  );
}
