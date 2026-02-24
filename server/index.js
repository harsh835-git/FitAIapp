import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));