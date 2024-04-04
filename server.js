
// Import of dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Config
dotenv.config();

require("colors");

const connectDB = require("./dbinit"); // Adjusted import to match TypeScript

// Import of Routes
const favRoute = require("./routes/favRoute");
const userRoute = require("./routes/userRoute");
const userAuth = require("./routes/userAuth");


// Initialize express app
const app = express();

// Constants
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoute);
app.use('/', userAuth);
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.all('*', (req, res) => {
    res.send('we are trying to meet your request, give us a moment');
    // res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
    connectDB().catch(err => console.error(err)); // Added catch for error handling
});
