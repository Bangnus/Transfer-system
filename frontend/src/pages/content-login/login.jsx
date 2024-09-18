import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/sis_th.png'
const login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/authenticate/login', {
        username,
        password,
      });
      if (res.status === 200) {
        setMessage(res.data.message);
        // navigate('/transfer');
        if (res.data.body.type === "student") {
          navigate('/student');
        } else {
          navigate('/personnel');
        }
      }
    } catch (error) {
      setMessage('รหัสผ่านไม่ถูกต้อง');
      console.error('Error:', error);
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
          <button
            type="submit"
            className="w-full bg-blue hover:bg-customBlue text-white  py-3 rounded-lg transition duration-300"
          >
            เข้าสู่ระบบ
          </button>
        </form>
        {message && <p className="mt-4 text-center text-white font-semibold">{message}</p>}
      </div>
    </div>

  );
};

export default login;
