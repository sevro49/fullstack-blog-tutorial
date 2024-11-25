const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { generateTokens } = require('../utils/tokenUtils');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await User.create({ username, email, password });

    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
    };

    res.status(201).json({ message: 'User registered successfully', user: userResponse });
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
    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie( 'accessToken', accessToken, { 
      httpOnly: true ,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, //15m
    }); // Send token as HTTP only cookie
    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const userResponse = {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    }

    res.status(200).json({ message: 'Login successfull', user: userResponse }); // success user login
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

const generateAccessToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if(!token) return res.status(401).json({ error: 'Refresh token is required!' });

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    const accessToken = jwt.sign({ id: payload.id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    res.cookie( 'accessToken', accessToken, { 
      httpOnly: true ,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000, //15m
    }); // Send token as HTTP only cookie

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).json({ error: 'Invalid refresh token' });
  }
};

const logout = (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/', // Cookie'nin oluşturulduğu path ile aynı olmalı
  };

  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);

  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { register, login, generateAccessToken, logout };