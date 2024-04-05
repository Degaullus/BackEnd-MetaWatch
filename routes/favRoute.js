const express = require('express');

const { getFavorites, addFavorite, remFavorite } = require("../controllers/Favorite");

const app = express.Router();

app.get("/get", getFavorites);
app.post("/add", addFavorite);
app.post("/remove", remFavorite);

module.exports = app;