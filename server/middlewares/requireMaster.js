const dotenv = require('dotenv');
dotenv.config();

const requireMaster = (req, res, next) => {
    try {
        const authheader = req.headers.authorization;
        if (!authheader) {
            res.status(401).json({ message: 'No token provided' });
        }
        if (authheader.split(' ')[0] !== 'Bearer') {
            res.status(401).json({ message: 'Invalid token' });
        }
        const token = authheader.split(' ')[1];
        if (token !== process.env.MASTER_TOKEN) {
            res.status(403).json({ message: 'Master access required' });
        }
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = requireMaster;