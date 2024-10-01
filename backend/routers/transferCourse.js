const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

//post
router.post('/addtransferCourse', async (req, res) => {
    try {
        const {
            courseCode,
            courseNameTH,
            courseNameENG,
            prerequisiteTH,
            prerequisiteENG,
            credit,
            gpa,
            descriptionTH,
            descriptionENG,
        } = req.body;
        const addtransferCourse = await prisma.TransferCourse.create({
            data: {
                courseCode,
                courseNameTH,
                courseNameENG,
                prerequisiteTH,
                prerequisiteENG,
                credit,
                gpa,
                descriptionTH,
                descriptionENG,
                courseTransfers
            },
        });
        res.json(addtransferCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error })
    }
})

// get
router.get('/transferCourse', async (req, res) => {
    try {
        const transferCourse = await prisma.TransferCourse.findMany({
        })
        res.json(transferCourse)
    } catch (error) {
        console.error(error)
        res.status(500).json([error])
    }
})

// get:ID
router.get('/transferCourse/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const transferCourse = await prisma.TransferCourse.findMany({
            where: {
                id: Number(id)
            }
        })
        res.json(transferCourse)
    } catch (error) {
        console.error(error)
        res.status(500).json([error])
    }
})

// put
router.put('/edittransferCourse/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { courseCode, courseName, credit, gpa, description } = req.body;
        const edittransferCourse = await prisma.TransferCourse.update({
            where: { id: Number(id) },
            data: {
                courseCode,
                courseName,
                credit,
                gpa,
                description
            }
        });
        res.json(edittransferCourse)
    } catch (error) {
        console.error(error)
    }
})
module.exports = router