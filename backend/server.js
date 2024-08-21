const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// กำหนดค่าการเชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: 'mysql', // ใช้ชื่อ service ใน docker-compose.yml
    user: 'root',
    password: 'root',
    database: 'transfer'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database');
  });

app.use(express.json());

// ลงทะเบียนผู้ใช้ใหม่
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.query(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        [username, hashedPassword],
        (err, results) => {
            if (err) {
                console.error('Error registering user:', err);
                return res.status(500).send('Server error');
            }
            res.status(201).send('User registered');
        }
    );
});

// ล็อกอินผู้ใช้
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (err, results) => {
            if (err) {
                console.error('Error fetching user:', err);
                return res.status(500).send('Server error');
            }
            if (results.length === 0) {
                return res.status(401).send('Invalid username or password');
            }

            const user = results[0];
            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send('Invalid username or password');
            }

            const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
            res.status(200).send({ auth: true, token });
        }
    );
});

// ดึงข้อมูลผู้ใช้ทั้งหมด
app.get('/users', (req, res) => {
    db.query('SELECT id, username, student_id, citizen_id, faculty, branch FROM users', (err, results) => {
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
