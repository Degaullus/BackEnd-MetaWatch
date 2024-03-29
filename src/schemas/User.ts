import mongoose from 'mongoose';

// Define an interface for the User document
interface IUser {
  name: string;
  email: string;
  password: string;
  date?: Date; // Optional because it has a default value
  ipaddress: string;
}

// Define the User schema using the interface
const UserSchema = new mongoose.Schema<IUser>({
  name: {
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
  }
  // date: {
  //   type: Date,
  //   default: Date.now
  // }
});

// Create and export the model
export const User = mongoose.model<IUser>('User', UserSchema);