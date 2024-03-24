import React, { useState } from "react";
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
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello!", sender: "John" },
    { id: 2, text: "Hi there!", sender: "Alice" },
    // Add more sample messages as needed
  ]);
  const [newMessage, setNewMessage] = useState("");

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
        const newMessageObj = {
          id: messages.length + 1,
          text: newMessage,
          sender: "You", // You can replace 'You' with the actual sender's name or ID
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
                    primary={message.sender}
                    secondary={message.text}
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
