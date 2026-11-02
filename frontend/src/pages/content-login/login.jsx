import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { setUser } from '../../store/actions/userActions';
import logo from '../../assets/sis_th.png';

const LOGO_ALT = 'มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย ระบบสารสนเทศนักศึกษา';

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
    setMessage('');
    try {
      const res = await axios.post('http://localhost:5000/api/authenticate/login', {
        username,
        password,
      });
      if (res.status === 200) {
        const userInfo = res.data.body;
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
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* Brand panel (desktop only) */}
      <aside className="hidden flex-col justify-between gap-12 bg-navy-900 p-12 text-white lg:flex xl:p-16">
        <div className="rounded-2xl bg-white px-6 py-5">
          <img className="h-auto w-full" src={logo} alt={LOGO_ALT} />
        </div>
        <div className="max-w-md">
          <p className="text-sm font-medium text-gold-400">คณะวิศวกรรมศาสตร์</p>
          <h2 className="mt-2 text-3xl font-semibold leading-snug text-white">ระบบเทียบโอนรายวิชา</h2>
          <p className="mt-3 text-base leading-relaxed text-navy-100">
            ยื่นขอเทียบโอนรายวิชาที่เคยเรียนผ่านมาแล้ว และติดตามผลการพิจารณาจากเจ้าหน้าที่ได้ในที่เดียว
          </p>
        </div>
        <p className="text-xs text-navy-200">มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย</p>
      </aside>

      {/* Sign-in form */}
      <main className="flex min-h-screen flex-col justify-center px-4 py-10 sm:px-6 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <img className="mb-10 h-auto w-full max-w-[280px] lg:hidden" src={logo} alt={LOGO_ALT} />

          <h1 className="page-title">เข้าสู่ระบบ</h1>
          <p className="page-sub">ระบบเทียบโอนรายวิชา คณะวิศวกรรมศาสตร์</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="username" className="label">ชื่อผู้ใช้งาน (รหัส e-Passport)</label>
              <input
                type="text"
                id="username"
                className="field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="label">รหัสผ่าน</label>
              <input
                type="password"
                id="password"
                className="field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            {message && (
              <p role="alert" className="flex items-center gap-2 text-sm font-medium text-red-600">
                <ExclamationCircleIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {message}
              </p>
            )}

            <button type="submit" className="btn-primary min-h-[44px] w-full" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  กำลังเข้าสู่ระบบ...
                </>
              ) : (
                'เข้าสู่ระบบ'
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
