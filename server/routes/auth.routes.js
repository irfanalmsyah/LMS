const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controllers');
const { requireMaster } = require('../middlewares');

router.post('/', requireMaster, login);

module.exports = router;
