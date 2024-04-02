const express = require('express');

const { getAllUsers } = require("../controllers/getUser");

const app = express.Router(); 

app.get("/", getAllUsers);

module.exports = app;