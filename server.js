import express from 'express';
import cors from 'cors';
import userRouter from "./controllers/userController.js";
import 'dotenv/config'
import mongoose from "mongoose";
import Restaurant from "./models/restaurantModel.js";
import cartRouter from "./controllers/cartController.js";

// Initialize express and configure middleware
const app = express();
const port = 5172;

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)

// DB connection
const connectDB = async ()=> {
  await mongoose.connect('mongodb+srv://ritul:FptXN09XDsTxrkh7@cluster0.k8qfi6d.mongodb.net/bundl').then(
    () => {
      console.log('Connected to MongoDB');

      // const collection = mongoose.connection.db.collection('carts');
      //
      // collection.dropIndex('items.restaurant.name_1', function(err, result) {
      //   if (err) {
      //     console.log('Error in dropping index!', err);
      //   }
      // });
    });
}

connectDB();

app.get("/", (req, res)=> {
  res.send("API works.")
});

app.listen(process.env.PORT || port, ()=> {
  console.log('Server running on port ' + port);
})

app.get("/api/restaurants", async (req, res) => {
  const restaurants = await Restaurant.find({});
  res.json(restaurants);
});