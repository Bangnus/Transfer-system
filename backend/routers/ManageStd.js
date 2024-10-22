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



module.exports = router
