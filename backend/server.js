const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config(); // load .env file
connectDB(); // connect to database

const app = express();

// Middlewares
app.use(express.json()); // JSON body parsing
app.use(cookieParser()); // Read Cookies
app.use(cors({ credentials: true, origin: 'http://localhost:5173'})); // CORS settings

// Routes
app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/blogs", require('./routes/blogRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));