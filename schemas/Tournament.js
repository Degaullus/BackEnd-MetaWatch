const mongoose = require('mongoose');

const tournamentResultSchema = new mongoose.Schema({
  army: {
    type: String,
    required: true
  },
  rank: {
    type: String,
    required: true
  },
  tournament: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  players: {
    type: Number,
    required: true
  },
  wins: {
    type: Number,
    required: true
  },
  rounds: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  list: String
}, { collection: 'tournamentData' }); // Specify the existing collection name here

const Tournament = mongoose.model('TournamentResult', tournamentResultSchema);

module.exports = Tournament;
