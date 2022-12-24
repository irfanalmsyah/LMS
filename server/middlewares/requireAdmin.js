const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAdmin = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) {
      throw new Error('Token is required');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.exp < Date.now() / 1000) {
      throw new Error('Token expired');
    }
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.role !== 'admin') {
      throw new Error('Admin only');
    }
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = requireAdmin;
