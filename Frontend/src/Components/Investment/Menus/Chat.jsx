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

const socket = io("http://localhost:5000");

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch messages when component mounts
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/messages?recipient=65fead563078cdddb0119031"
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
  }, []); // Empty dependency array to fetch messages only once on component mount

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    const messageData = {
      content: newMessage,
      sender: "65fead563078cdddb0119031",
      recipient: "65fead563078cdddb0119031",
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

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
              Chat
            </Typography>
            <List style={{ maxHeight: 300, overflow: "auto" }}>
              {messages.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={message.content}
                    secondary={message.sender === "You" ? "You" : message.sender}
                    primaryTypographyProps={{
                      fontWeight: message.sender === "You" ? "bold" : "normal",
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
