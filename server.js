import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import userRouter from "./controllers/userController.js";
import 'dotenv/config'
import mongoose from "mongoose";
import Restaurant from "./models/restaurantModel.js";
import cartRouter from "./controllers/cartController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5172;

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)

app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// DB connection
const connectDB = async ()=> {
  await mongoose.connect('mongodb+srv://ritul:FptXN09XDsTxrkh7@cluster0.k8qfi6d.mongodb.net/bundl').then(
    () => {
      console.log('Connected to MongoDB.');
    });
}

connectDB();

app.get("/", (req, res)=> {
  res.send("API works.")
});

app.get("/api/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.json(restaurants);
});

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

app.listen(process.env.PORT || port, ()=> {
  console.log('Server running on port ' + port);
});