import React from 'react';
import { Navigate } from 'react-router-dom';

const checkAuth = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// สำหรับเส้นทางสาธารณะ (เช่น หน้า Login) ที่ไม่ควรเข้าถึงได้หากล็อกอินแล้ว
const PublicRoute = ({ children}) => {
  const user = checkAuth();

  // ถ้าผู้ใช้ล็อกอินอยู่ ให้เปลี่ยนไปยังหน้า dashboard ตามประเภทของผู้ใช้
  if (user) {
    return <Navigate to={user.type === 'student' ? '/student' : '/personnel'} />;
  }

  // ถ้าไม่ได้ล็อกอิน ให้แสดง children (เช่น หน้า login)
  return children;
};

export default PublicRoute;
