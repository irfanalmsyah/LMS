const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourse,
    createCourse,
} = require('../controllers/course.controllers');

const { requireAuth, requireLecturer } = require('../middlewares/');

router.get('/', requireAuth, getAllCourses);
router.post('/', requireLecturer, createCourse);

router.get('/:courseId(\\d+)', requireAuth, getCourse);

module.exports = router;