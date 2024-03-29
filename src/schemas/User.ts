import mongoose, { Model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

// this is necessary for ts to recognize the type
interface IUser {
  username: string;
  email: string;
  password: string;
  date: Date;
}

interface IUuserModel extends Model<IUser> {
  signup(email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

// Define the User schema using the interface
const UserSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,

    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});



// Create and export the model
export const User = mongoose.model<IUser>('User', UserSchema);