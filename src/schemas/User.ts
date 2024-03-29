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

interface IUserModel extends Model<IUser> {
  signup(email: string, password: string): Promise<IUser>;
  login(email: string, password: string): Promise<IUser>;
}

// Define the User schema using the interface
const userSchema = new mongoose.Schema<IUser>({
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

userSchema.statics.signup = async function( email: string, password: string): Promise<IUser> {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }

  // Note: validator.isStrongPassword returns true for strong passwords, so you need to invert the condition
  if (!validator.isStrongPassword(password)) {
    throw new Error("Make sure to use at least 8 characters, one upper case, one lower case, a number, a symbol");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
}

userSchema.statics.login = async function( email: string, password: string): Promise<IUser> {
  if (!email || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Email is incorrect or it doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
}

// Create and export the model
const User = mongoose.model<IUser, IUserModel>('User', userSchema);
export default User;