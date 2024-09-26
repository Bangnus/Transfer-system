import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/connent-navbar/navbar'
import { useNavigate, Link } from 'react-router-dom';
import Iconenroll from '../../assets/icon_enroll3_y.png';
import Icontranfer from '../../assets/icon_transfer2_y.png';

const StudentPage = () => {
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // ดึงข้อมูลผู้ใช้จาก localStorage
    if (!storedUser) {
      navigate('/'); // ถ้าไม่มีข้อมูลผู้ใช้ให้นำทางไปที่หน้า login
    }
  }, [user, navigate]);
  return (
    <>
      <Navbar username={user?.username} />
      <div className="flex">
        <Link to="/tranfer">
          <img src={Icontranfer} alt="Icon transfer" className='w-32' />
        </Link>
        <img src={Iconenroll} alt="Icon enroll" className='w-32' />
      </div>
    </>

  );
};

export default StudentPage;
