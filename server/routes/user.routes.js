const express = require('express');
const router = express.Router();
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getMe,
    updateMe,
} = require('../controllers/user.controllers');

const {
    requireAuth,
    requireAdmin,
} = require('../middlewares');

router.get('/', requireAdmin, getAllUsers);
router.post('/', requireAdmin, createUser);

router.get('/:id(\\d+)', requireAdmin, getUser);
router.put('/:id(\\d+)', requireAdmin, updateUser);
router.delete('/:id(\\d+)', requireAdmin, deleteUser);

router.get('/me', requireAuth, getMe);
router.put('/me', requireAuth, updateMe);


module.exports = router;
