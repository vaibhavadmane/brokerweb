import dotenv from 'dotenv'; // For environment variables
import connectDB from './db/index.js';
import { app } from './app.js';
import userRouter from './router/user.router.js'; // Import user routes
import listingRoutes from './router/card.router.js'

dotenv.config(); // Load environment variables from .env file

// Ensure that the PORT variable is loaded correctly
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.status(200).send('Landing Page');
});

// Use imported routes
app.use('/api/v1/users', userRouter);
app.use('/api/listings', listingRoutes);

// Connect to the database and start the server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err);
    });
