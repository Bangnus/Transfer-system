const express = require('express')
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

router.post('/notification', async (req, res) => {
    const { username, message } = req.body
    try {
        const notification = await prisma.notification.create({
            data: {
                message,
                userId: username
            }
        })
        res.json(notification)
    } catch (error) {
        console.error('Error createing notification', error);
        res.status(500).json({ error: 'Failed to create notification' });
    }
});

router.get('/notifications', async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            orderBy: { createdAt: 'desc' },
        })
        res.json(notifications)
    } catch (error) {
        console.error('Error fetching notification', error)
        res.status(500).json({ error: 'Failed to fetch notifications' })
    }
})

module.exports = router