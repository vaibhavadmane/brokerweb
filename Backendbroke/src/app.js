import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';






// Initialize the express app
const app = express();
dotenv.config({
    path: '.env'
});

app.use(cors({
  origin: 'http://localhost:5173', // Update to match your frontend's origin
  credentials: true,
}));

// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));



app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Export the app instance
export { app };
