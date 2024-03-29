// Imports
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'colors';
import { connectDB } from './dbinit'; // Adjusted import to match TypeScript
import userRoute from './routes/userRoute';

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
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/users', userRoute)

app.all('*', (req, res) => {
	res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.yellow.bold);
    connectDB().catch(err => console.error(err)); // Added catch for error handling
});
