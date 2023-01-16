const Course = require('../models').Course;
const CourseChild = require('../models').CourseChild;
const CourseClass = require('../models').CourseClass;
const Enrollment = require('../models').Enrollment;
const Teaching = require('../models').Teaching;
const { Op } = require('sequelize');

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.findAll();
        res.json({ courses: courses });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const getCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        const courseClasses = await course.getCourseclasses({
            attributes: ['id']
        });
        switch (req.user.role) {
            case 'student':
                const enrolledClasses = await Enrollment.findAll({
                    where: {
                        userId: req.user.id,
                        courseclassId: {
                            [Op.in]: courseClasses.map(courseClass => courseClass.id),
                        }
                    },
                    attributes: ['courseclassId']
                });
                if (enrolledClasses.length === 0) {
                    throw new Error('You are not enrolled in this course');
                }
                const enrolledClassIds = enrolledClasses.map(enrolledClass => enrolledClass.courseclassId);
                const enrolledCourseClasses = await CourseClass.findAll({
                    where: {
                        id: {
                            [Op.in]: enrolledClassIds,
                        }
                    },
                    include: [{
                        model: CourseChild
                    }]
                });
                res.json({
                    name: course.name,
                    code: course.code,
                    courseClasses: enrolledCourseClasses,
                });
                break;
            case 'lecturer':
                const teachingClasses = await Teaching.findAll({
                    where: {
                        userId: req.user.id,
                        courseclassId: {
                            [Op.in]: courseClasses.map(courseClass => courseClass.id),
                        }
                    },
                    attributes: ['courseclassId']
                });
                if (teachingClasses.length === 0) {
                    throw new Error('You are not teaching this course');
                }
                const teachingClassIds = teachingClasses.map(teachingClass => teachingClass.courseclassId);
                const teachingCourseClasses = await CourseClass.findAll({
                    where: {
                        id: {
                            [Op.in]: teachingClassIds,
                        }
                    },
                    include: [{
                        model: CourseChild
                    }]
                });
                res.json({
                    course,
                    courseClasses: teachingCourseClasses,
                });
                break;
            default:
                throw new Error('You are not authorized to view this course');
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        const newCourseClass = await newCourse.createCourseclass({ code: 'main' });
        await Teaching.create({
            userId: req.user.id,
            courseclassId: newCourseClass.id,
        });
        res.json({ course: newCourse });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const createClass = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        const mainClass = await course.getCourseclasses({
            where: { code: 'main' }
        });
        if (!mainClass) {
            throw new Error('Main class not found');
        }
        const teaching = await Teaching.findOne({
            where: {
                userId: req.user.id,
                courseclassId: mainClass[0].id,
            }
        });
        if (!teaching) {
            throw new Error('You are not teaching this course');
        }
        const newCourseClass = await course.createCourseclass(req.body);
        await Teaching.create({
            userId: req.user.id,
            courseclassId: newCourseClass.id,
        });
        res.json({ courseClass: newCourseClass });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const createChild = async (req, res) => {
    try {
        const courseClass = await CourseClass.findByPk(req.params.classId);
        if (!courseClass) {
            throw new Error('Course class not found');
        }
        const teaching = await Teaching.findOne({
            where: {
                userId: req.user.id,
                courseclassId: courseClass.id,
            }
        });
        if (!teaching) {
            throw new Error('You are not teaching this class');
        }
        const newCourseChild = await courseClass.createCoursechild(req.body);
        res.json({ courseChild: newCourseChild });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        const mainClass = await course.getCourseclasses({
            where: { code: 'main' }
        });
        if (!mainClass) {
            throw new Error('Main class not found');
        }
        const teaching = await Teaching.findOne({
            where: {
                userId: req.user.id,
                courseclassId: mainClass[0].id,
            }
        });
        if (!teaching) {
            throw new Error('You are not teaching this course main class');
        }
        await course.update(req.body);
        res.json({ course });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const updateClass = async (req, res) => {
    try {
        const courseClass = await CourseClass.findByPk(req.params.classId);
        if (!courseClass) {
            throw new Error('Course class not found');
        }
        const teaching = await Teaching.findOne({
            where: {
                userId: req.user.id,
                courseclassId: courseClass.id,
            }
        });
        if (!teaching) {
            throw new Error('You are not teaching this class');
        }
        await courseClass.update(req.body);
        res.json({ courseClass });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const updateChild = async (req, res) => {
    try {
        const courseChild = await CourseChild.findByPk(req.params.childId);
        if (!courseChild) {
            throw new Error('Course child not found');
        }
        const courseClass = await courseChild.getCourseclass();
        if (!courseClass) {
            throw new Error('Course class not found');
        }
        const teaching = await Teaching.findOne({
            where: {
                userId: req.user.id,
                courseclassId: courseClass.id,
            }
        });
        if (!teaching) {
            throw new Error('You are not teaching this class');
        }
        await courseChild.update(req.body);
        res.json({ courseChild });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByPk(req.params.courseId);
        if (!course) {
            throw new Error('Course not found');
        }
        const mainClass = await course.getCourseclasses({
            where: { code: 'main' }
        });
        if (!mainClass) {
            throw new Error('Main class not found');
        }
        const teaching = await Teaching.findOne({
            where: {
                userId: req.user.id,
                courseclassId: mainClass[0].id,
            }
        });
        if (!teaching) {
            throw new Error('You are not teaching this course main class');
        }
        await course.destroy();
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const deleteClass = async (req, res) => {
    try {
        const courseClass = await CourseClass.findByPk(req.params.classId);
        if (!courseClass) {
            throw new Error('Course class not found');
        }
        if (courseClass.code === 'main') {
            throw new Error('You cannot delete the main class');
        }
        const teaching = await Teaching.findOne({
            where: {
                userId: req.user.id,
                courseclassId: courseClass.id,
            }
        });
        if (!teaching) {
            throw new Error('You are not teaching this class');
        }
        await courseClass.destroy();
        res.json({ message: 'Class deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

const deleteChild = async (req, res) => {
    try {
        const courseChild = await CourseChild.findByPk(req.params.childId);
        if (!courseChild) {
            throw new Error('Course child not found');
        }
        const courseClass = await courseChild.getCourseclass();
        if (!courseClass) {
            throw new Error('Course class not found');
        }
        const teaching = await Teaching.findOne({
            where: {
                userId: req.user.id,
                courseclassId: courseClass.id,
            }
        });
        if (!teaching) {
            throw new Error('You are not teaching this class');
        }
        await courseChild.destroy();
        res.json({ message: 'Child deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}


const getMyCourse = async (req, res) => {
    try {
        let myClasses;
        switch (req.user.role) {
            case 'student':
                myClasses = await Enrollment.findAll({
                    where: { userId: req.user.id }
                });
                break;
            case 'lecturer':
                myClasses = await Teaching.findAll({
                    where: { userId: req.user.id }
                });
                break;
            default:
                throw new Error('Invalid user role');
        }
        const myClassIds = myClasses.map(myClass => myClass.courseclassId);
        const myCourseClasses = await CourseClass.findAll({
            where: {
                id: {
                    [Op.in]: myClassIds,
                }
            }
        });
        const myCourseClassIds = myCourseClasses.map(myCourseClass => myCourseClass.courseId);
        const myCourses = await Course.findAll({
            where: {
                id: {
                    [Op.in]: myCourseClassIds
                }
            }
        });
        res.json({ courses: myCourses });
    } catch (error) {
        res.status(400).json({ message: error.message });
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
    }
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    createClass,
    getMyCourse,
    createChild,
    updateCourse,
    updateClass,
    updateChild,
    deleteCourse,
    deleteClass,
    deleteChild,
}