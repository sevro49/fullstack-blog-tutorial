const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const routeSetup = require('./routes')

dotenv.config(); // load .env file
connectDB(); // connect to database

const app = express();

// Middlewares
app.use(express.json()); // JSON body parsing
app.use(cookieParser()); // Read Cookies
app.use(cors({ credentials: true, origin: 'http://localhost:5173'})); // CORS settings

// Setup Routes
routeSetup(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));