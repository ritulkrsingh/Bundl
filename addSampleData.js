import mongoose from 'mongoose';
import Food from './models/foodModel.js';
import Restaurant from './models/restaurantModel.js';

// Connect to MongoDB
mongoose.connect('mongodb+srv://ritul:FptXN09XDsTxrkh7@cluster0.k8qfi6d.mongodb.net/bundl', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define sample food items
const foodItems0 = [
  new Food({
    name: 'Pizza',
    description: 'Delicious cheese pizza',
    price: 8,
    image: 'pizza.jpg',
    category: 'Pizza & Burger',
  }),
  new Food({
    name: 'Burger',
    description: 'Juicy chicken burger',
    price: 5,
    image: 'burger.jpg',
    category: 'Pizza & Burger',
  }),
];

const foodItems1 = [
  new Food({
    name: 'Cheesy Pizza',
    description: 'Delicious pizza with extra cheese',
    price: 12,
    image: 'pizza.jpg',
    category: 'Pizza',
  }),
];

// Define sample restaurants
const restaurants = [
  new Restaurant({
    name: 'Restaurant 1',
    location: 'Location 1',
    menu: foodItems0,
  }),
  new Restaurant({
    name: 'Restaurant 2',
    location: 'Location 2',
    menu: foodItems1,
  }),
];

const saveRestaurants = async () => {
  for (const restaurant of restaurants) {
    try {
      await restaurant.save();
      console.log('Restaurant saved');
    } catch (err) {
      console.log(err);
    }
  }
};

saveRestaurants().then(() => {
  mongoose.connection.close();
});