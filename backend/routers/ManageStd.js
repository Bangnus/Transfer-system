const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

router.get('/students', async (req, res) => {
    const { id } = req.params
    try {
        const students = await prisma.Users.findMany({
            where: {
                type: "student",
                username: id
            },
            include: {
                StudentCourse: {
                    include: {
                        courseTransfers: {
                            include: {
                                Course: true,
                                SpecialCourse: true
                            }
                        }
                    }
                }
            }

        })
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Not Fatching Student' })
    }
})

router.get('/student/:firstname', async (req, res) => {
    const { firstname } = req.params
    try {
        const students = await prisma.Users.findMany({
            where: {
                firstname: firstname
            },
            include: {
                StudentCourse: {
                    include: {
                        courseTransfers: {
                            include: {
                                Course: true,
                                SpecialCourse: true
                            }
                        }
                    }
                }
            }

        })
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: 'Not Fatching Student' })
    }
})

router.get('/course/:courseCode', async (req, res) => {
    const { courseCode } = req.params
    try {
        const course = await prisma.StudentCourse.findMany({
            where: {
                courseCode: courseCode
            },
            include: {
                courseTransfers: {
                    include: {
                        Course: true,
                        SpecialCourse: true
                    }
                }
            }
        })
        res.json(course);
    } catch (error) {
        console.error('Error Fetching Course', error)
        res.status(500).json('Error Fetching Course', error)
    }
})

router.put('/status/:transferId', async (req, res) => {
    const { transferId } = req.params;
    const { description, status } = req.body;
    try {
        const statusCourse = await prisma.CourseTransfer.update({
            where: {
                id: parseInt(transferId),
            },
            data: {
                description,
                status,
            },
        })
        res.json(statusCourse)
    } catch (error) {
        console.log('Error Fetching Status Course', error)
        res.status(500).json({ message: 'Error updating course transfer status' });
    }
})


module.exports = router
