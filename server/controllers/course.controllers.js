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
        /* const enrolledClasses = await Enrollment.findAll({
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
        } else {
            const enrolledClassIds = enrolledClasses.map(enrolledClass => enrolledClass.courseclassId);
            const enrolledCourseClasses = await CourseClass.findAll({
                where: {
                    id: {
                        [Op.in]: enrolledClassIds,
                    }
                },
                include: [{
                    model: CourseChild,
                    attributes: ['name', 'description']
                }],
                attributes: ['code']
            });
            res.json({ 
                name: course.name,
                code: course.code,
                courseClasses: enrolledCourseClasses,
            });
        } */
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
                        model: CourseChild,
                        attributes: ['name', 'description']
                    }],
                    attributes: ['code']
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
                        model: CourseChild,
                        attributes: ['name', 'description']
                    }],
                    attributes: ['code']
                });
                res.json({
                    name: course.name,
                    code: course.code,
                    courseClasses: teachingCourseClasses,
                });
                break;
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        const newCourseClass = await newCourse.createCourseclass({ code: 'main' });
        const teaching = await Teaching.create({
            userId: req.user.id,
            courseclassId: newCourseClass.id,
        });
        res.json({ course: teaching });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
}