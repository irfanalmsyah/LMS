const dotenv = require('dotenv');
dotenv.config();

const requireMaster = (req, res, next) => {
    try {
        const authheader = req.headers.authorization;
        if (!authheader) {
            throw new Error('Token is required');
        }
        if (authheader.split(' ')[0] !== 'Bearer') {
            throw new Error('Invalid token format');
        }
        const token = authheader.split(' ')[1];
        if (token !== process.env.MASTER_TOKEN) {
            throw new Error('Invalid token');
        }
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = requireMaster;