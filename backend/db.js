const mysql = require('mysql2');

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

  module.exports = db;