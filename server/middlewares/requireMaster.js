const dotenv = require('dotenv');
dotenv.config();

const requireMaster = (req, res, next) => {
    try {
        const token = req.body.token;
        if (!token) {
            throw new Error('Token is required');
        }
        if (token !== process.env.MASTER_TOKEN) {
            throw new Error('Invalid master token');
        }
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = requireMaster;