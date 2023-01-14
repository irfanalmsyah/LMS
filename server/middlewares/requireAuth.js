const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    try {
        const authheader = req.header('Authorization');
        if (!authheader) {
            throw { "name": "AuthError", "message": "No token provided" };
        }
        if (authheader.split(' ')[0] !== 'Bearer') {
            throw { "name": "AuthError", "message": "Invalid token format" };
        }
        const token = authheader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            throw { "name": "AuthError", "message": "User not found" };
        }
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError || error.name === 'AuthError') {
            res.status(401).json({ message: error.message });
        } else {
            res.status(400).json({ message: error.message });
        }
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
};

module.exports = requireAuth;
