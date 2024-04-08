const express = require('express');

const { getDB } = require("../controllers/getDB");

const app = express.Router();

app.get("/", getDB);

module.exports = app;