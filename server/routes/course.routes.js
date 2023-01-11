const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourse,
    createCourse,
    getMyCourse,
    createClass,
    createChild,
    updateCourse,
    updateClass,
    updateChild,
    deleteCourse,
    deleteClass,
    deleteChild,
} = require('../controllers/course.controllers');

const { requireAuth, requireLecturer } = require('../middlewares/');

router.get('/', requireAuth, getAllCourses);
router.post('/', requireLecturer, createCourse);

router.get('/:courseId(\\d+)', requireAuth, getCourse);
router.post('/:courseId(\\d+)/', requireLecturer, createClass);
router.put('/:courseId(\\d+)/', requireLecturer, updateCourse);
router.delete('/:courseId(\\d+)/', requireLecturer, deleteCourse);

router.post('/:courseId(\\d+)/class/:classId(\\d+)/', requireLecturer, createChild);
router.put('/:courseId(\\d+)/class/:classId(\\d+)/', requireLecturer, updateClass);
router.delete('/:courseId(\\d+)/class/:classId(\\d+)/', requireLecturer, deleteClass);

router.put('/:courseId(\\d+)/class/:classId(\\d+)/child/:childId(\\d+)/', requireLecturer, updateChild);
router.delete('/:courseId(\\d+)/class/:classId(\\d+)/child/:childId(\\d+)/', requireLecturer, deleteChild);

router.get('/me', requireAuth, getMyCourse);

module.exports = router;