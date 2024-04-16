const express = require("express");

const { addFavorite, remFavorite } = require("../controllers/Favorite");

const app = express.Router();

const requireAuth = require("../middlewares/requireAuth");

app.use(requireAuth);
app.post("/add/:id", addFavorite);
app.post("/rem/:id", remFavorite);

module.exports = app;
