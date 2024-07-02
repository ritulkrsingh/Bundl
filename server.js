import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import 'dotenv/config'
import mongoose from "mongoose";
import Restaurant from "./models/restaurantModel.js";
import userRouter from "./controllers/userController.js";
import cartRouter from "./controllers/cartController.js";
import chatRouter from "./controllers/chatController.js";
import { initSocket } from "./controllers/chatController.js";
import * as dotenv from "dotenv";
import { Server } from 'socket.io';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
initSocket(server);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use('/api', chatRouter);
app.get("/api/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.json(restaurants);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist'), {
    // setHeaders: (res, path) => {
    //   if (path.endsWith('.jsx')) {
    //     res.setHeader('Content-Type', 'application/javascript');
    //   }
    // }
  }));
  app.get('*', (req, res) => {
    fs.readFile(path.join(__dirname, 'dist', 'index.html'), (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.setHeader('Content-Type', 'text/html');
        res.send(data);
      }
    });
  });
}

// DB connection
const connectDB = async ()=> {
  await mongoose.connect(process.env.MONGODB_URI).then(
    () => {
      console.log('Connected to MongoDB.');
    });
}

connectDB();

app.get("/", (req, res)=> {
  res.send("API works.")
});

const port = process.env.PORT || 5172;
server.listen(port, ()=> {
  console.log('Server running on port ' + port);
});