import mongoose from 'mongoose';
import foodModel from './foodModel.js';

const cartItemSchema = new mongoose.Schema({
  quantity: { type: Number, required: true, min: 1 },
  food: foodModel.schema,
  restaurantName: { type: String, required: true}
});

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [cartItemSchema]
});

const cartModel = mongoose.models.cart || mongoose.model('cart', cartSchema);
export default cartModel;