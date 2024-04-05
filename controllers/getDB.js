const mongoose = require('mongoose');

const getDB = async (req, res) => {
  try {
    const db = await mongoose.connection.db.collection('tournamentData');
    const data = await db.find({}).toArray();
    res.status(200).json({
      data: data
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || "An unknown error occurred"
    });
  }
}

module.exports = { getDB };