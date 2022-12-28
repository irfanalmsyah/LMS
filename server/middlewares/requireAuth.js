const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    try {
        const authheader = req.header('Authorization');
        if (!authheader) {
            throw new Error('Token is required');
        }
        if (authheader.split(' ')[0] !== 'Bearer') {
            throw new Error('Invalid token format');
        }
        const token = authheader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.exp < Date.now() / 1000) {
            throw new Error('Token expired');
        }
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = requireAuth;
