import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/actions/userActions';
import { setToken} from '../../store/actions/authActions';
import logo from '../../assets/sis_th.png'
import { Button } from "@material-tailwind/react";
const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


const handleSubmit = async (event) => {
  event.preventDefault();
  setLoading(true);
  try {
    const res = await axios.post('http://localhost:5000/api/authenticate/login', {
      username,
      password,
    });
    if (res.status === 200) {
      const userInfo = res.data.body;
      const token = res.data.authToken;
      console.log(userInfo)
      console.log(token)
      setMessage(res.data.message);
      localStorage.setItem('user', JSON.stringify(userInfo)); // เก็บข้อมูลผู้ใช้ใน localStorage
      dispatch(setUser(userInfo));
      dispatch(setToken(token));
      if (userInfo.type === "student") {
        navigate('/student');
      } else {
        navigate('/personnel');
      }
    }
  } catch (error) {
    setMessage('รหัสผ่านไม่ถูกต้อง');
    console.error('Error:', error);
  } finally {
    setLoading(false);
  }
};

return (

  <div className='h-screen flex items-center '>
    <div className="bg-white-700 w-[600px] p-8 rounded shadow-lg mx-auto  animate-fade-down animate-once animate-duration-1000">
      <div className="flex justify mb-6">
        <img className="w-full h-full" src={logo} alt="Logo" />
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-blck  mb-2">
            ชื่อผู้ใช้งาน (รหัส e-Passport)
          </label>
          <input
            type="text"
            id="username"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customYellow"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='ชื่อผู้ใช้งาน (รหัส e-Passport)'
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-blck  mb-2">
            รหัสผ่าน
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-customYellow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='รหัสผ่าน'
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue hover:bg-customBlue text-white  py-4 rounded-lg transition duration-300 flex justify-center items-center"
          disabled={loading}
          onClick={handleSubmit}
          loading={loading} // ใช้ prop นี้เพื่อแสดงไอคอนหมุน
        >
          {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
        </Button>
      </form>
      {message && <p className="mt-4 text-center text-white font-semibold">{message}</p>}
    </div>
  </div >

);
};

export default login;
