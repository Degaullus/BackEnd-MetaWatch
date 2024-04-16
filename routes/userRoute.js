const express = require("express");

const { getOneUser, getAllUsers } = require("../controllers/getUser");

const app = express.Router();

const requireAuth = require("../middlewares/requireAuth");

app.use(requireAuth);

app.get("/", getAllUsers);
app.get("/:id", getOneUser);

module.exports = app;
