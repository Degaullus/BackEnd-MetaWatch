import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { User } from '../schemas/User';

// Create a new user
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    
    // Corrected the response method to set status before sending JSON
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({
        message: "Email already in use",
      });
    } else {
      // General error fallback
      res.status(500).json({
        message: error.message || "An unknown error occurred",
      });
    }
  }
};

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    const userCount = await User.countDocuments();
    if (!users.length) {
      res.status(404).json({
        message: "No users found",
      });
      return;
    }
    res.status(200).json({
      message: `Total users: ${userCount}`,
      data: users,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "An unknown error occurred",
      });
    }
  }
}

export { createUser, getAllUsers };