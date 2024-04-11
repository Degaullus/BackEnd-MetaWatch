const express = require('express');

const { addFavorite, remFavorite } = require("../controllers/Favorite");

const app = express.Router();

app.post("/add/:id", addFavorite);
app.post("/rem/:id", remFavorite);

module.exports = app;