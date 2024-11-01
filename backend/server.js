// backend/server.js
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: 'http://localhost:3000', // Allow only requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    credentials: true, // Allow cookies to be sent with requests
  })
);
const biomassRoutes = require('./routes/BiomassRoutes');
app.use('/api', biomassRoutes); 


// Routes
app.use('/api/users', require('./routes/UserRoutes'));
app.use('/api/biomass', require('./routes/BiomassRoutes'));
app.use('/', biomassRoutes);

// Serve static files (optional, if you want to serve uploads from a static folder)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
