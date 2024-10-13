const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();


const prisma = new PrismaClient();

// get
router.get('/course', async (req, res) => {
    try {
        const course = await prisma.StudentCourse.findMany({
        })
        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเเสดงข้อมูล' });
    }
})
// get:ID
router.get('/course/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const course = await prisma.StudentCourse.findMany({
            where: {
                id: Number(id)
            }
        });
        res.json(course);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการเเสดงข้อมูล' });
    }
})

// post
router.post('/addcourse', async (req, res) => {
    try {
        const {
            courseCode,
            courseName,
            credit,
            grade,
            description,
            usernameId,
        } = req.body;

        const newPost = await prisma.StudentCourse.create({
            data: {
                courseCode,
                courseName,
                credit,
                grade,
                description,
                usernameId,
            },
        })
        res.json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    }
});

// put
router.put('/editcourse/:id', async (req, res) => {
    try {
        const { id } = req.params
        const {
            courseCode,
            courseName,
            credit,
            grade,
            description,
        } = req.body;
        const editcourse = await prisma.StudentCourse.update({
            where: { id: Number(id) },
            data: {
                courseCode,
                courseName,
                credit,
                grade,
                description
            },
        });
        res.json(editcourse)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error })
    }
});

module.exports = router