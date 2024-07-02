import React, { useContext, useEffect, useState } from 'react';
import {Button, Card, CardContent, TextField} from "@mui/material";
import { StoreContext } from "./StoreContext.jsx";
import io from 'socket.io-client';
import axios from 'axios';

function Chat( {chatUser} ) {
  const { url, userId } = useContext(StoreContext);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState('');
  const socket = io(url);

  useEffect(() => {
    axios.get(url + `api/chatHistory`, {
      params: {
        user1: userId,
        user2: chatUser.userId
      }
    })
      .then(response => {
        setChatHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching chat history:', error);
      });
  }, [url, userId, chatUser]);

  useEffect(() => {
    socket.on('message', (newMessage) => {
      setChatHistory(oldChatHistory => [...oldChatHistory, newMessage]);
    });
    return () => {
      socket.off('message');
    };
  }, [socket]);

  const sendMessage = (e) => {
    e.preventDefault();
    axios.post(url + 'api/message', {
      sender: userId,
      receiver: chatUser.userId,
      message: message
    })
      .then(response => {
        console.log('Message sent:', response.data);
        setMessage('');
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  }

  return (
    <Card sx={{width: '20vw', marginTop: '113px', borderRadius: '10px', paddingY: 0}} elevation={2}>
      <CardContent sx={{padding: 0}}>
        <h3 style={{marginTop: 6, marginLeft: 14, textAlign: 'left'}}>{chatUser.userName}</h3>

        <Card sx={{
          height: 'calc(100vh - 113px - 65px)',
          marginTop: -1.5,
          marginBottom: -3,
          borderRadius: '10px',
          paddingX: 2
        }} elevation={4}>
          {chatHistory.map((message, index) => (
            <p key={index}>{message.message}</p>
          ))}
          <form onSubmit={(e) => {sendMessage(e)}}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              fullWidth
              autoComplete="off"
            />
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </Card>
      </CardContent>
    </Card>
  );
}

export default Chat;