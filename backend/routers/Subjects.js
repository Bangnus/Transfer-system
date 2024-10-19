const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();


const prisma = new PrismaClient();


// get subjectCategoryWithGroups
router.get('/subjectCategoryWithGroups', async (req, res) => {
    try {
        const subjectCategories = await prisma.SubjectCategory.findMany({
            include: {
                groups: {
                    include: {
                        courses: true,
                    }
                }
            }
        });

        const generalEducationCategory = subjectCategories.filter(category => category.name === 'หมวดวิชาศึกษาทั่วไป');
        res.json(generalEducationCategory)
    } catch (error) {
        console.error(error);
        res.json(500).json({ error: 'Error fetching subject categories with groups.' })
    }
});

// get specialsubjectCategoryWithGroups
router.get('/specialsubjectCategotyWithGroup', async (req, res) => {
    try {
        const specialsubjectCategories = await prisma.SubjectCategory.findMany({
            include: {
                SpecialGroup: {
                    include: {
                        SubSpecialtyGroup: {
                            include: {
                                SpecialCourse: true,
                            }
                        }
                    }
                }
            }
        });
        const generalEducationCategory = specialsubjectCategories.filter(category => category.name === 'หมวดวิชาเฉพาะ');
        res.json(generalEducationCategory);
    } catch (error) {
        console.error(error)
        res.json(500).json({ error: 'Error fetching special subject categories with groups.' })

    }
})

router.get('/coursetransfer', async (req, res) => {
    try {
        const { username } = req.query
        const coursetransfer = await prisma.CourseTransfer.findMany({
            where: {
                student: {
                    usernameId: username
                }
            },
            include: {
                student: true,
                Course: {
                    include: {
                        group: true,
                    }
                },
                SpecialCourse: {
                    include: {
                        SubSpecialtyGroup: {
                            include: {
                                SpecialGroup: {
                                    include: {
                                        SubjectCategory: true
                                    }
                                },
                            }
                        }
                    }
                },

            }
        })
        res.json(coursetransfer)
    } catch (error) {
        console.error({ error: 'Get coursetransfer fail' })
        res.status(500).json({ error: 'Get oursetransfer fail' })
    }
})

module.exports = router;