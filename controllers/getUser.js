const User = require("../schemas/User");

const getOneUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("favorites").exec();

    console.log("USER", user);

    // const user = await query;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const responseData = { favorites: user.favorites };
    res.status(200).json(responseData);
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "An unknown error occurred" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("favorites");
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
    if (error) {
      res.status(500).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: error.message || "An unknown error occurred",
      });
    }
  }
};
module.exports = { getOneUser, getAllUsers };
