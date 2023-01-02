const requireAdmin = require('./requireAdmin');
const requireAuth = require('./requireAuth');
const requireMaster = require('./requireMaster');
const requireLecturer = require('./requireLecturer');

module.exports = {
    requireAdmin,
    requireAuth,
    requireMaster,
    requireLecturer
};  