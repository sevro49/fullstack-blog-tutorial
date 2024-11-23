// Desc: Middleware to verify JWT token from cookie
// if token is valid, set user in request object
// if token is invalid, return 403 status code
// that way, we can protect routes that require authentication

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken; // get token from cookie
  if(!token) return res.status(401).json({ error: 'Unauthorized' }); // If token doesn't exist, return unauthorized
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Set user in request object, so we can access it in the next middleware
    next(); // Proceed to the next middleware
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;