import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function Activist() {
  const [users, setUsers] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    id: "",
    displayName: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/userdetails"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = (user) => {
    setOpenEditDialog(true);
    setEditedUserData({
      id: user._id,
      displayName: user.displayName,
      email: user.email,
      role: user.role,
    });
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(
        `http://localhost:5000/auth/userdetailsupdate/${editedUserData.id}`,
        editedUserData
      );
      fetchUsers(); // Refetch the updated user data
      setOpenEditDialog(false); // Close the edit dialog
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/auth/userdetailsdelete/${id}`);
      fetchUsers(); // Refetch the updated user data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        User Management
      </Typography>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user._id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>
              {user.displayName} - {user.email} - {user.role}
            </span>
            <span>
              <Button variant="contained" onClick={() => handleEditClick(user)}>
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </Button>
            </span>
          </li>
        ))}
      </ul>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <TextField
            label="Display Name"
            name="displayName"
            value={editedUserData.displayName}
            onChange={handleInputChange}
          />
          <TextField
            label="Email"
            name="email"
            value={editedUserData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Role"
            name="role"
            value={editedUserData.role}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateUser}>Save Changes</Button>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
