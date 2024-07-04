import express from 'express';
import Chat from '../models/chatModel.js'; // Assuming you have a Chat model
import { Server } from 'socket.io';

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected to the socket.');

    socket.on('disconnect', () => {
      console.log('A user disconnected from the socket.');
    });

    socket.on('message', (msg) => {
      console.log('Message ' + msg);
      io.emit('message', msg);
    });
  });
}

const router = express.Router();

router.post('/message', async (req, res) => {
  const { sender, receiver, message } = req.body;

  try {
    const newMessage = new Chat({
      sender,
      receiver,
      message
    });

    const savedMessage = await newMessage.save();
    io.emit('message', savedMessage);
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message!' });
  }
});

router.get('/chatHistory', async (req, res) => {
  const { user1, user2 } = req.query;

  try {
    const chatHistory = await Chat.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 }
      ]
    });

    res.json(chatHistory);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching chat history!' });
  }
});

export default router;