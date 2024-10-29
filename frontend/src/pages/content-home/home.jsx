import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/connent-navbar/navbar'
import { useNavigate, Link } from 'react-router-dom';
import Iconenroll from '../../assets/icon_enroll3_y.png';
import Icontranfer from '../../assets/icon_transfer2_y.png';

const Home = () => {
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // ดึงข้อมูลผู้ใช้จาก localStorage
    if (!storedUser) {
      navigate('/'); // ถ้าไม่มีข้อมูลผู้ใช้ให้นำทางไปที่หน้า login
    }
  }, [user, navigate]);
  return (
    <>
      <Navbar />
      <div className="flex m-5 gap-5 animate-fade animate-once animate-ease-in animate-normal">
        <Link to="/tranfer" className="transform transition-transform duration-300 hover:scale-105">
          <img src={Icontranfer} alt="Icon transfer" className='w-32 shadow-lg rounded-lg hover:shadow-xl' />
        </Link>
        {/* <Link to="" className="transform transition-transform duration-300 hover:scale-105"> */}
        <img src={Iconenroll} alt="Icon enroll" className='w-32 shadow-lg rounded-lg hover:shadow-xl' />
        {/* </Link> */}
      </div>

    </>

  );
};

export default Home;
