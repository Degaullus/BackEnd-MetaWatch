import { Request, Response } from 'express';
import { User } from '../schemas/User';

// Create a new user
const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, ipaddress } = req.body;
    const user = new User({ name, email, password, ipaddress });
    
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

export { createUser };