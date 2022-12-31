const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourse,
} = require('../controllers/course.controllers');

const { requireAuth } = require('../middlewares/');

router.get('/', requireAuth, getAllCourses);

router.get('/:courseId(\\d+)', requireAuth, getCourse);

module.exports = router;