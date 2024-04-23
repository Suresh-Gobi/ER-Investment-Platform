import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to your Socket.io server

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState(""); // State to hold the userId

  useEffect(() => {
    // Fetch userId from localStorage and decode the token
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && decodedToken.id) {
        setUserId(decodedToken.id);
      }
    }

    // Fetch messages when component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/messages?recipient=${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Listen for incoming messages from the server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [userId]); // Include userId in the dependency array to fetch messages when userId changes

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    const messageData = {
      content: newMessage,
      sender: userId, // Use userId as the sender
      recipient: userId, // Use userId as the recipient
    };

    try {
      const response = await fetch("http://localhost:5000/api/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        // Update messages state with the new message immediately after sending
        const newMessageObj = {
          content: newMessage,
          sender: "You",
        };
        setMessages((prevMessages) => [...prevMessages, newMessageObj]);
        setNewMessage(""); // Clear the input field after sending
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to decode the JWT token
  const decodeToken = (token) => {
    try {
      // Decode the token
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Chat
            </Typography>
            <Typography variant="h4" gutterBottom>
              User ID: {userId}
            </Typography>
            <List style={{ maxHeight: 300, overflow: "auto" }}>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={message.content}
                    secondary={message.sender === userId ? "You" : message.sender}
                    primaryTypographyProps={{
                      fontWeight: message.sender === userId ? "bold" : "normal",
                    }}
                  />
                </ListItem>
              ))}
            </List>
            <TextField
              label="Message"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 10 }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
