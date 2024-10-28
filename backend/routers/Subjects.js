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
        res.status(500).json({ error: 'Error fetching subject categories with groups.' })
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
router.put('/coursetransfer/:id', async (req, res) => {
    const { id } = req.params
    const { courseCode, courseName, credit, grade, description } = req.body
    try {
        const coursetransfer = await prisma.StudentCourse.update({
            where: {
                id: parseInt(id)
            },
            data: {
                courseCode,
                courseName,
                credit,
                grade,
                description
            }
        })
        res.json(coursetransfer)
    } catch (error) {
        console.error({ error: 'Error Update Course' })
        res.status(500).json({ error: 'Error Update Course' })
    }
})

router.get('/coursetransfer/:id', async (req, res) => {
    const { id } = req.params
    try {
        const coursetransfer = await prisma.StudentCourse.findUnique({
            where: {
                id: parseInt(id)
            },
        })
        res.json(coursetransfer)
    } catch (error) {
        console.error({ error: 'Error Update Course' })
        res.status(500).json({ error: 'Error Update Course' })
    }
})

router.delete('/coursetransfer/:id', async (req, res) => {
    const { id } = req.params
    try{
        const deletecourse = await prisma.StudentCourse.delete({
            where: {
                id: parseInt(id),
            },
        })
        res.json(deletecourse)
    }catch (error) {
        res.status(500).json('Failed To  Delete Course', error)
    }
})

module.exports = router;