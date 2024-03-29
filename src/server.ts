// Immport of dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'colors';
import { connectDB } from './dbinit'; // Adjusted import to match TypeScript

// Import of Routes
import userRoute from './routes/userRoute';
import userAuth from './routes/userAuth';

// Config
dotenv.config();

// Initialize express app
const app = express();

// Constants
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoute)
app.use('/', userAuth)

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.all('*', (req, res) => {
	res.redirect('/');
    res.send('we are trying to meet your request, give us a moment')
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
    connectDB().catch(err => console.error(err)); // Added catch for error handling
});
