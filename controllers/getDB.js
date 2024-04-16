const mongoose = require("mongoose");
const TournamentModel = require("../schemas/Tournament"); // Assuming you have a Tournament model defined

const getDB = async (req, res) => {
  try {
    const tournaments = await TournamentModel.find();
    res.status(200).json(tournaments);
    // console.log(tournaments);
  } catch (error) {
    res.status(500).json({
      message: error.message || "An unknown error occurred",
    });
  }
};

const getTournamentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await TournamentModel.findById(id);

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Backend: Tournament problem",
    });
  }
};

module.exports = { getDB, getTournamentsById };
