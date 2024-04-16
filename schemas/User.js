const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [
    {
      type: String,
    },
  ],
});

// SIGNUP                   SIGNUP                  SIGNUP
userSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  // Check if username or email already exists
  const existingUser = await this.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("Email already in use");
    }
    if (existingUser.username === username) {
      throw new Error("Username already in use");
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create a new user with both username and email
  const user = await this.create({ username, email, password: hash });
  return user;
};

// LOGIN                   LOGIN                  LOGIN
userSchema.statics.login = async function (identifier, password) {
  if (!identifier || !password) {
    throw new Error("All fields must be filled");
  }

  const user = await this.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });

  if (!user) {
    throw new Error("Username/email is incorrect or it doesn't exist");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Incorrect password");
  }

  return user;
};

userSchema.methods.remFavorite = async function (removedFavorite) {
  // Ensure `removedFavorite` is converted to an ObjectId, if necessary
  const ObjectId = require("mongoose").Types.ObjectId;
  removedFavorite = new ObjectId(removedFavorite);

  this.favorites = this.favorites.filter((fav) => !fav.equals(removedFavorite));
  const changesMade = this.isModified("favorites");
  await this.save();
  return changesMade
    ? { message: "Removed from favorites successfully." }
    : { message: "Favorite not found." };
};

userSchema.methods.addFavorite = async function (addedFavorite) {
  if (!this.favorites.includes(addedFavorite)) {
    this.favorites.push(addedFavorite);
    await this.save();
    return { message: "Added to favorites successfully." };
  }
  return { message: "Already in favorites." };
};

module.exports = mongoose.model("User", userSchema);
