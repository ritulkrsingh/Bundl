import mongoose from 'mongoose';
import food from './foodModel.js';

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  menu: [food.schema]
});

const restaurantModel = mongoose.models.restaurantModel || mongoose.model('restaurant', restaurantSchema);
export default restaurantModel;