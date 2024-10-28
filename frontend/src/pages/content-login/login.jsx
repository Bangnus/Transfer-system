import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/actions/userActions';
import logo from '../../assets/sis_th.png';
import { Button } from "@material-tailwind/react";

const Login = () => {
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
        console.log(userInfo);
        // setMessage(res.data.message);
        if (userInfo.type === "student" || userInfo.type === "staff") {
          localStorage.setItem('user', JSON.stringify(userInfo)); // เก็บข้อมูลผู้ใช้ใน localStorage
          dispatch(setUser(userInfo));
        }

        if (userInfo.type === "student") {
          navigate('/home');
        } else if (userInfo.type === "staff") {
          navigate('/personnel')
        } else {
          setMessage('คุณไม่สามารถเข้าได้')
          navigate('/')
        }

      }
    } catch (error) {
      setMessage('รหัสผ่านไม่ถูกต้อง');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-screen flex items-center'>
      <div className="bg-white w-[600px] p-8 rounded shadow-lg mx-auto animate-fade-down animate-once animate-duration-1000">
        <div className="flex justify mb-6">
          <img className="w-full h-full" src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-blck mb-2">
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
            <label htmlFor="password" className="block text-blck mb-2">
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
            className="w-full bg-blue hover:bg-customBlue text-white py-4 rounded-lg transition duration-300 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 "
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                กำลังเข้าสู่ระบบ...
              </>
            ) : (
              'เข้าสู่ระบบ'
            )}
          </Button>

        </form>
        {message && <p className="mt-4 text-center text-red-500 font-semibold">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
