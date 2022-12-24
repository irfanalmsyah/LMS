const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');


const login = async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        throw new Error('Email and password are required');
      }
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Email or password is incorrect');
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Email or password is incorrect');
      }
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };  

module.exports = {
    login,
};
  
  