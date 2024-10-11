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
            descriptionTH,
            descriptionENG,
            groupId
        } = req.body;
        const addtransferCourse = await prisma.Course.create({
            data: {
                courseCode,
                courseNameTH,
                courseNameENG,
                prerequisiteTH,
                prerequisiteENG,
                credit: parseInt(credit),
                descriptionTH,
                descriptionENG,
                groupId,

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
        const transferCourse = await prisma.Course.findMany({
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
        const transferCourse = await prisma.Course.findMany({
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
        const {
            courseCode,
            courseNameTH,
            courseNameENG,
            prerequisiteTH,
            prerequisiteENG,
            credit,
            descriptionTH,
            descriptionENG,
            groupId
        } = req.body;
        const edittransferCourse = await prisma.Course.update({
            where: { id: Number(id) },
            data: {
                courseCode,
                courseNameTH,
                courseNameENG,
                prerequisiteTH,
                prerequisiteENG,
                credit: parseInt(credit),
                descriptionTH,
                descriptionENG,
                groupId,
            }
        });
        res.json(edittransferCourse)
    } catch (error) {
        console.error(error)
    }
})
module.exports = router