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
  }, []); // Empty dependency array to fetch messages only once on component mount

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      return;
    }

    const messageData = {
      content: newMessage,
      sender: "65fead563078cdddb0119031", // Replace 'YourSenderId' with the actual sender ID
      recipient: "65fead563078cdddb0119031", // Replace 'RecipientId' with the actual recipient ID
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
        // Add the sent message to the list immediately
        const newMessageObj = {
          id: messages.length + 1,
          content: newMessage,
          sender: "You",
        };
        setMessages([...messages, newMessageObj]);
        setNewMessage("");
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
              {messages.map((message) => (
                <ListItem key={message.id}>
                  <ListItemText
                    primary={message.content} // Display only the message content
                    secondary={message.sender === "You" ? "You" : message.sender}
                    // Show sender as secondary text, except for your own messages
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
