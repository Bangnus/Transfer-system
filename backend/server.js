const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
require('dotenv').config();
require('./config/passport');
const { readdirSync } = require('fs');
const passport = require('passport');

const app = express();
const port = 5000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        return res.status(200).json({ message: 'Welcome to Node.js and Express API!' });
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});

app.use('/api/manage', require('./routers/ManageStd'))
app.use('/api/subject', require('./routers/Subjects'));
// SpecialSubjects
app.use('/api/addsubSpecial', require('./routers/SpecialSubjects'));
// addCourseStudent
app.use('/api/addcourse', require('./routers/studentCourse'));
// addtransferCourse
app.use('/api/addtransfer', require('./routers/transferCourse'));
//coursefransfer
app.use('/api/transsfer', require('./routers/CourseTransfer'));
//notifications
app.use('/api/notify', require('./routers/notification'))

app.use('/api/authenticate', require('./routers/auth'));
app.use('/api/authenticate', require('./routers/auth'));

readdirSync('./routers').map((r) => app.use('/api/v1', passport.authenticate('jwt', { session: false }), require('./routers/' + r)));

console.log(readdirSync('./routers'))
// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
