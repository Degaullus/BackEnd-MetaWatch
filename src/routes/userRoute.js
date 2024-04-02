const express = require('express');

const { getAllUsers } = require("../controllers/user");

const app = express.Router(); 

app.get("/", getAllUsers);

module.exports = app;