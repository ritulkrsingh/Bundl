import express from 'express'
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRouter = express.Router();

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET);
}

userRouter.post('/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({success: false, message: 'User does not exist'});
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({success: false, message: 'Invalid credentials'});
    }

    const token = createToken(user._id);
    res.json({success: true, token, userId: user._id});
  } catch (error) {
    console.log(error);
    res.json({success: false, message: 'Error logging in'});
  }
});

userRouter.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  try {
    const exists = await userModel.findOne({email});
    if (exists) {
      return res.json({success:false,message:"User already exists"});
    }
    if (!validator.isEmail(email)) {
      return res.json({success:false,message:"Email is invalid"});
    }
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name:name,
      email:email,
      password:hashedPassword
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({success:true, token, userId: user._id});
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error in creating user"});
  }
});

userRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, name: user.name });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default userRouter;