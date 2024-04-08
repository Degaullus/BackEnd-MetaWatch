
// Import of dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Config
dotenv.config();

require("colors");
const connectDB = require("./dbinit"); // Adjusted import to match TypeScript

// Import of Routes
const favRoute = require("./Users/routes/favRoute");
const userRoute = require("./Users/routes/userRoute");
const userAuth = require("./Users/routes/userAuth");
const DBRoute = require("./Users/routes/DBRoute");

// SVG
const emojiFaviconSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <text y=".9em" font-size="90">😊</text>
</svg>`;

// Initialize express app
const app = express();

// Constants
const PORT = process.env.PORT || 8080;

//Favicon
app.get('/favicon.ico', (req, res) => {
    res.type('image/svg+xml');
    res.send(emojiFaviconSVG);
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoute);
app.use('/favorites', favRoute);
app.use('/db', DBRoute);
app.use('/', userAuth);

// Default routes
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
