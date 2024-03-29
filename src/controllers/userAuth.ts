import { Request, Response } from 'express';
import User from '../schemas/User';
import jwt from 'jsonwebtoken';

const createToken = (id: string) => {
  const secret = process.env.SECRET || 'defaultSecret';
  return jwt.sign({ id }, secret, {
    expiresIn: '1h',
  });
}

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ user: user._id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

const signupUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}


export { createToken, loginUser, signupUser }