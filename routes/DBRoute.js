const express = require("express");
const { getDB, getTournamentsById } = require("../controllers/getDB");

const app = express.Router();

app.get("/", getDB);
app.get("/:id", getTournamentsById);

module.exports = app;
