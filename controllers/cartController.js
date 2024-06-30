import express from 'express';
import Cart from '../models/cartModel.js';

const cartRouter = express.Router();

cartRouter.post('/', async (req, res) => {
  const { userId, food, restaurantName, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  } else if (!cart.items) {
    cart.items = [];
  }

  const itemIndex = cart.items.findIndex(item => item.food._id.equals(food._id) && item.restaurantName === restaurantName);

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];
    item.quantity += quantity;
    cart.items[itemIndex] = item;
  } else {
    cart.items.push({ food, restaurantName, quantity });
  }

  const updatedCart = await cart.save();

  res.json(updatedCart);
});

cartRouter.delete('/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.body;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  cart.items = cart.items.filter(item => !item._id.equals(itemId));

  const updatedCart = await cart.save();

  res.json(updatedCart);
});

cartRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.json({ user: userId, items: []});
  }

  res.json(cart);
});

cartRouter.get('/', async (req, res) => {
  const carts = await Cart.find({});
  res.json(carts);
});

export default cartRouter;