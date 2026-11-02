import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  ArrowsRightLeftIcon,
  ArrowRightIcon,
  PlusIcon,
  ClipboardDocumentCheckIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';

const STATUSES = ['PENDING', 'APPROVED', 'REJECTED'];

const Home = () => {
  const [error, setError] = useState('');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const username = user?.username;
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // ดึงข้อมูลผู้ใช้จาก localStorage
    if (!storedUser) {
      navigate('/'); // ถ้าไม่มีข้อมูลผู้ใช้ให้นำทางไปที่หน้า login
    }
  }, [user, navigate]);

  // Same call as the transfer list page, used here for the status summary
  useEffect(() => {
    if (!username) { setLoading(false); return; }
    let ignore = false;
    axios.get('http://localhost:5000/api/subject/coursetransfer', { params: { username } })
      .then((res) => { if (!ignore) setRequests(Array.isArray(res.data) ? res.data : []); })
      .catch(() => { if (!ignore) setError('โหลดสรุปคำขอไม่สำเร็จ'); })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [username]);

  const counts = requests.reduce((acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }), {});
  const program = [user?.facname, user?.secname].filter(Boolean).join(' · ');

  return (
    <AppLayout>
      <div className="page-head">
        <div>
          <p className="text-sm text-slate-500">สวัสดี</p>
          <h1 className="page-title">{user?.name || user?.username || 'นักศึกษา'}</h1>
          {program && <p className="page-sub">{program}</p>}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Primary task */}
        <section className="card card-pad lg:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-900 text-gold-400">
              <ArrowsRightLeftIcon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-slate-900">เทียบโอนรายวิชา</h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                เพิ่มรายวิชาที่เคยเรียนผ่านมาแล้วเพื่อขอเทียบโอนกับรายวิชาของมหาวิทยาลัย และติดตามผลการพิจารณาของแต่ละรายวิชา
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <Link to="/tranfer" className="btn-primary">
                  ดูคำขอเทียบโอน<ArrowRightIcon aria-hidden="true" />
                </Link>
                <Link to="/course" className="btn-secondary">
                  <PlusIcon aria-hidden="true" />เพิ่มวิชาเทียบโอน
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Own requests by status */}
        <section className="card lg:row-span-2" aria-labelledby="summary-title">
          <div className="card-head">
            <h2 id="summary-title" className="card-title">คำขอเทียบโอนของฉัน</h2>
            {!loading && !error && <span className="num text-sm text-slate-500">ทั้งหมด {requests.length} รายการ</span>}
          </div>
          {loading ? (
            <p className="px-5 py-8 text-sm text-slate-500 sm:px-6">กำลังโหลดข้อมูล...</p>
          ) : error ? (
            <p role="alert" className="px-5 py-8 text-sm font-medium text-red-600 sm:px-6">{error}</p>
          ) : requests.length === 0 ? (
            <div className="empty-state">
              <InboxIcon aria-hidden="true" />
              <p className="font-medium text-slate-700">ยังไม่มีคำขอเทียบโอน</p>
              <Link to="/course" className="btn-ghost btn-sm mt-1"><PlusIcon aria-hidden="true" />เพิ่มวิชาเทียบโอน</Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-slate-100">
                {STATUSES.map((s) => (
                  <li key={s} className="flex items-center justify-between gap-3 px-5 py-3.5 sm:px-6">
                    <StatusBadge status={s} />
                    <span className="num text-xl font-semibold text-slate-900">{counts[s] || 0}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-100 px-5 py-3 sm:px-6">
                <Link to="/tranfer" className="btn-ghost btn-sm -ml-3">ดูรายการทั้งหมด<ArrowRightIcon aria-hidden="true" /></Link>
              </div>
            </>
          )}
        </section>

        {/* Not built yet: shown as unavailable, not linked */}
        <section className="card card-pad bg-slate-50/60 lg:col-span-2" aria-disabled="true">
          <div className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
              <ClipboardDocumentCheckIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-slate-500">การลงทะเบียนเรียน</h2>
                <span className="badge-neutral">เร็ว ๆ นี้</span>
              </div>
              <p className="mt-1 text-sm text-slate-500">ยังไม่เปิดให้ใช้งานในระบบนี้</p>
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Home;
