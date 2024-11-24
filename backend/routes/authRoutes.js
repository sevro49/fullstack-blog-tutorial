const express = require('express');
const { register, login, generateAccessToken, logout } = require('../controllers/authController');

const router = express.Router();

// Routes for authentication
router.post('/register', register); // register a user
router.post('/login', login); // login a user
router.post('/refresh-token', generateAccessToken); // generate access token
router.post('/logout', logout); // logout a user

module.exports = router;
