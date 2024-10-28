const express = require('express')
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

router.post('/notification', async (req, res) => {
    const { username, message, StdCourseId } = req.body
    try {
        const notification = await prisma.notification.create({
            data: {
                message,
                userId: username,
                StdCourseId: parseInt(StdCourseId),
            }
        })
        res.json(notification)
    } catch (error) {
        console.error('Error createing notification', error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
});

router.put('/notification/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const notify = await prisma.notification.update({
            where: { id: parseInt(id) },
            data: {
                isRead: true
            },
        })
        res.json(notify)
    } catch (error) {
        res.status(500).json('Error Update Notificatio', error)
    }
})

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: {
                isRead: false,
            },
            orderBy: { createdAt: 'desc' },
            include: {
                user: true,
                studentcourse: true,
            }
        })

        res.json(notifications)
    } catch (error) {
        console.error('Error fetching notification', error)
        res.status(500).json({ error: 'Failed to fetch notifications' })
    }
})

module.exports = router