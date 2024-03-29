import { Request, Response } from 'express';
import { User } from '../schemas/User';

// Create a new user
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    
    // Corrected the response method to set status before sending JSON
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    // Improved error handling with type checking
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

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    if (!users.length) {
      res.status(404).json({
        message: "No users found",
      });
      return;
    }
    res.status(200).json({
      message: "Users retrieved successfully",
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