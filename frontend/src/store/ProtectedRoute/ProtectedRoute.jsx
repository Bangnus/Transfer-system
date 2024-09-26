import React from 'react';
import { Navigate } from 'react-router-dom';

// ฟังก์ชันตรวจสอบการล็อกอิน
const checkAuth = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

// คอมโพเนนต์ ProtectedRoute
const ProtectedRoute = ({ children,allowedTypes  }) => {
    const user = checkAuth();

    // ถ้าไม่มีผู้ใช้ (ไม่ได้ล็อกอิน) ให้นำทางไปหน้าเข้าสู่ระบบ
    if (!user) {
        return <Navigate to="/" />;
    }
    // ถ้าประเภทของผู้ใช้ไม่อยู่ใน allowedTypes ให้นำทางไปที่หน้าอื่น (เช่น หน้า student หรือ personnel)
    if (!allowedTypes.includes(user.type)) {
        return <Navigate to={user.type === 'student' ? '/student' : '/personnel'} />;
    }
    // ถ้าล็อกอินแล้ว ให้แสดง children ที่เป็นหน้าที่ต้องการเข้าถึง
    return children;
};

export default ProtectedRoute;
