const express = require('express');

const { getOneUser, getAllUsers } = require("../controllers/getUser");

const app = express.Router(); 

app.get("/", getAllUsers);
app.get("/:id", getOneUser);

module.exports = app;