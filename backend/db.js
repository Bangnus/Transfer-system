const { Pool } = require('pg');

// กำหนดค่าการเชื่อมต่อฐานข้อมูล PostgreSQL
const pool = new Pool({
  host: 'postgres', // ใช้ชื่อ service ใน docker-compose.yml
  user: 'root',
  password: 'root',
  database: 'transfer'
});

module.exports = pool;
