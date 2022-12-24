const User = require('../models').User;
const bcrypt = require('bcryptjs');

const getAllUsers = async (req, res) => {
	try {
		const users = await User.findAll();
		res.json({ users: users });
  	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const createUser = async (req, res) => {
  	try {
		if (
            !req.body.name || 
            !req.body.email || 
            !req.body.password ||
            !req.body.username ||
            !req.body.nim
        ) { 
			throw new Error('Name, email, password, username, and nim are required');
		}
		const { name, email, password, role, username, nim } = req.body;
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			throw new Error('Invalid email');
		}
		const user = await User.findOne({ where: { email } });
		if (user) {
			throw new Error('Email already exists');
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await User.create({ name, email, password: hashedPassword, role, username, nim });
		res.json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
    try {
		const { id } = req.params;
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
		if (!user) {
			throw new Error('User not found');
		}
        res.json(user);
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        await user.destroy();
        res.send('User deleted');
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error('User not found');
        }
        const { name, email, password } = req.body;
        const updatedUser = await user.update({ name, email, password });
        res.json(updatedUser);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    try {
        res.json(req.user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const updateMe = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updatedUser = await req.user.update({ name, email, password });
        res.json(updatedUser);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getMe,
    updateMe,
};
