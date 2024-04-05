const mongoose = require('mongoose');

const DBSchema = new mongoose.Schema({
  type: String
});

module.exports = {
  DBSchema: mongoose.model('DB', DBSchema)
}