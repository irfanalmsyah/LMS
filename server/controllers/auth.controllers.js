const jwt = require('jsonwebtoken');
const User = require('../models').User;
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            throw new Error('Please provide a username and password');
        }
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error('Username or password is incorrect');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Username or password is incorrect');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
};  

module.exports = {
    login,
};
  
  