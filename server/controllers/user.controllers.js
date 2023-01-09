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
            !req.body.username ||
            !req.body.password ||
            !req.body.role
        ) { 
			throw new Error('Name, username, password, and role are required');
		}
		const { name, username, password, role, regnum } = req.body;
		const user = await User.findOne({ where: { username } });
		if (user) {
			throw new Error('Username already exists');
		}
        const email = username + '@apps.ipb.ac.id';
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = await User.create({ name, username, email, password: hashedPassword, role, regnum });
		res.json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

const getUser = async (req, res) => {
    try {
		const { id } = req.params;
        const user = await User.findByPk(id);
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
        res.json({ message: 'User deleted' });
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
        const { name, email, password, role, regnum } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const updatedUser = await user.update({ name, email, password: hashedPassword, role, regnum });
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
        const { phone } = req.body;
        const updatedUser = await req.user.update({ 
            phone
        });
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
