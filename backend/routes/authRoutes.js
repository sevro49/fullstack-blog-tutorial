const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Routes for authentication
router.post('/register', register); // register a user
router.post('/login', login); // login a user

module.exports = router;
