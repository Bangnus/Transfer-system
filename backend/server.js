const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const db = require('./db')

const app = express();
const port = 5000;

app.use(express.json());

// // ลงทะเบียนผู้ใช้ใหม่
// app.post('/register', (req, res) => {
//     const { username, password } = req.body;
//     const hashedPassword = bcrypt.hashSync(password, 8);

//     db.query(
//         'INSERT INTO students (username, password) VALUES (?, ?)',
//         [username, hashedPassword],
//         (err, results) => {
//             if (err) {
//                 console.error('Error registering user:', err);
//                 return res.status(500).send('Server error');
//             }
//             res.status(201).send('User registered');
//         }
//     );
// });

// // ล็อกอินผู้ใช้
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     db.query(
//         'SELECT * FROM students WHERE username = ?',
//         [username],
//         (err, results) => {
//             if (err) {
//                 console.error('Error fetching user:', err);
//                 return res.status(500).send('Server error');
//             }
//             if (results.length === 0) {
//                 return res.status(401).send('Invalid username or password');
//             }

//             const user = results[0];
//             const passwordIsValid = bcrypt.compareSync(password, user.password);

//             if (!passwordIsValid) {
//                 return res.status(401).send('Invalid username or password');
//             }

//             const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
//             res.status(200).send({ auth: true, token });
//         }
//     );
// });

// ดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/students_info', (req, res) => {
    db.query('SELECT id, username, student_id, citizen_id, faculty, branch, previous_school FROM students_info', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).send('Server error');
        }
        console.log(results); // ตรวจสอบข้อมูลที่ได้รับ
        res.status(200).json(results);
    });
});


// เริ่มต้นเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
