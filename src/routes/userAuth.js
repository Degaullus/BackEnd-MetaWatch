const express = require('express');

const { loginUser, signupUser } = require("../controllers/userAuth");

const app = express.Router(); // Use a more descriptive name for clarity

app.post("/login", loginUser);
app.post("/signup", signupUser);

module.exports = app; 
