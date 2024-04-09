const mongoose = require('mongoose');
const TournamentModel = require('../schemas/Tournament'); // Assuming you have a Tournament model defined

const getDB = async (req, res) => {
  try {
    // Assuming you're connecting to MongoDB with Mongoose
    // If not connected already, you need to connect
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Assuming you have a Tournament model
    const tournaments = await TournamentModel.find();

    res.status(200).json(tournaments);
    console.log(tournaments);
  } catch (error) {
    res.status(500).json({
      message: error.message || "An unknown error occurred"
    });
  }
}

module.exports = { getDB };
