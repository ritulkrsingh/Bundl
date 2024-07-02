import React, { useContext, useEffect, useState } from 'react';
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import { StoreContext } from "./StoreContext.jsx";
import io from 'socket.io-client';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';


function ChatMessage({ message, isOwnMessage }) {
  return (
    <Box
      sx={{
        alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
        mb: 1,
        minWidth: '15%'
      }}
    >
      <Card
        sx={{
          borderRadius: 2,
          p: 1,
          bgcolor: isOwnMessage ? 'primary.main' : 'grey.300',
          color: isOwnMessage ? 'primary.contrastText' : 'primary.contrastText',
          maxHeight: '20px',
        }}
      >
        <Typography variant="body1" style={{ textAlign: isOwnMessage ? 'right' : 'left' }}>{message}</Typography>
      </Card>
    </Box>
  );
}

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
    if (!message) return;
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
          paddingLeft: 2,
          paddingRight: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end'
        }} elevation={4}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column'}}>
            { chatHistory.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.message}
                isOwnMessage={message.sender === userId}
              />
          ))}</div>
          <form style={{ display: 'flex', paddingBottom: '15px', width: '100%', marginTop: '8px' }} onSubmit={(e) => {sendMessage(e)}}>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              fullWidth
              autoComplete="off"
              size="small"
              style={{ marginRight: '10px', flexGrow: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ minWidth: '30px', width: '40px', borderRadius: '20%'}}
            >
              <SendIcon />
            </Button>
          </form>
        </Card>
      </CardContent>
    </Card>
  );
}

export default Chat;