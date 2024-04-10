const express = require('express');

const { addFavorite, remFavorite } = require("../controllers/Favorite");

const app = express.Router();

app.post("/add", addFavorite);
app.post("/remove", remFavorite);

module.exports = app;