const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check user if exists
    const user = await User.findOne({ email });

    // If user doesn't exist or password is incorrect
    if(!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If user exists and password is correct create JWT
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie( 'accessToken', accessToken, { httpOnly: true }); // Send token as HTTP only cookie
    res.json({ message: 'Login successfull', user }); // success user login
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

module.exports = { register, login };