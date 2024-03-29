import mongoose from 'mongoose';

// this is necessary for ts to recognize the type
interface IUser {
  username: string;
  email: string;
  password: string;
  date: Date;
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