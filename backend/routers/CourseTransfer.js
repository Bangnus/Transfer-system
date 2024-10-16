const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

router.post('/coursetransfer', async (req, res) => {
    try {
        const { originalCourseId, transferredCourseId, specialtransferredCourseId } = req.body

        const addcoursetransfer = await prisma.CourseTransfer.create({
            data: {
                originalCourseId,
                transferredCourseId,
                specialtransferredCourseId,
                status: 'PENDING',
            }
        })
        res.json(addcoursetransfer)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Post coursefransfer fail' })
    }
});

router.get('/getcoursetransfer', async (req, res) => {
    try {
        const getcoursetransfer = await prisma.CourseTransfer.findMany({});
        res.json(getcoursetransfer);
    } catch (error) {
        console.error('get course transfer fail', error); // เพิ่มการแสดงผลของ error ที่เกิดขึ้น
        res.status(500).json({ error: 'get course transfer fail' });
    }
});



module.exports = router
