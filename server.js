// Imports

const express = require('express');
const cors = require('cors');
const app = express();


// Config
require('dotenv').config();
require('colors');


// Connect to DB
const connectDB = require('./dbinit');
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
    connectDB();
});