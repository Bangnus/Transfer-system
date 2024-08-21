// กำหนดค่าการเชื่อมต่อฐานข้อมูล MySQL
const db = mysql.createPool({
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'transfer',
    connectionLimit: 10 // กำหนดขีดจำกัดการเชื่อมต่อ
});


// เชื่อมต่อฐานข้อมูล
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        process.exit(1);
    }
    console.log('Database connected');
    connection.release();
});

module.exports = db;