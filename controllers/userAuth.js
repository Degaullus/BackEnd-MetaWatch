const jwt = require("jsonwebtoken");
const User = require("../schemas/User");

const createToken = (id, username) => {
  return jwt.sign({ _id: id, username }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
};

const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Updated to receive username and email separately

    const identifier = username || email; // Determine which identifier to use
    const userVerification = await User.login(identifier, password);

    if (!userVerification) {
      throw new Error("Authentication failed");
    }

    const user = await User.findById(userVerification._id);
    if (!user) {
      throw new Error("User not found");
    }

    const token = createToken(user.id, user.username);

    const favCount = user.favorites.length;

    res.status(200).json({
      username: user.username,
      email: user.email,
      token,
      favCount,
    });
  } catch (error) {
    res.status(400).json({ error: error.message, message: "Failed to log in" });
  }
};

const signupUser = async (req, res) => {
  try {
    // console.log(req.body)
    const { username, email, password, favCount, favorites } = req.body;
    const user = await User.signup(username, email, password);
    const token = createToken(user._id);

    // console.log(` ${email} signed up`)
    res.status(200).json({
      username,
      email,
      token,
      favCount: 0,
      favorites: [],
      message: "signed up",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
