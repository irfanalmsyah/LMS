const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAdmin = async (req, res, next) => {
    try {
        const authheader = req.header('Authorization');
        if (!authheader) {
            res.status(401).json({ message: 'No token provided' });
        }
        if (authheader.split(' ')[0] !== 'Bearer') {
            res.status(401).json({ message: 'Invalid token' });
        }
        const token = authheader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            res.status(401).json({ message: 'User not found' });
        }
        if (user.role !== 'admin') {
            res.status(403).json({ message: 'Admin access required' });
        }
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: error.message });
        } else {
            res.status(400).json({ message: error.message });
        }
    }
};

module.exports = requireAdmin;
