import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UsersIcon, ClockIcon, CheckCircleIcon, XCircleIcon, InboxIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';

const thaiDate = (value) => (value
  ? new Date(value).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
  : '-');

const Dashboard = () => {

  const [students, setStudents] = useState([])
  // const [status, setStatus] = useState([]);
  const [status, setStatus] = useState({
    pending: [],
    approved: [],
    rejected: [],
  });
  // UI-only: the raw transfer list (for "คำร้องล่าสุด"), loading and error flags
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/manage/students`)
        setStudents(res.data)
      } catch (error) {
        console.error('Fail fetching Students')
        setError('โหลดข้อมูลนักศึกษาไม่สำเร็จ');
      }
    };
    const fetchCourseTransfer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transsfer/getcoursetransfer`);

        // แยกข้อมูลตามสถานะ
        const pending = res.data.filter(item => item.status === 'PENDING');
        const approved = res.data.filter(item => item.status === 'APPROVED');
        const rejected = res.data.filter(item => item.status === 'REJECTED');

        // อัพเดตสถานะ
        setStatus({
          pending,
          approved,
          rejected,
        });
        setTransfers(res.data);
      } catch (error) {
        console.error('Error fetching notifications', error);
        setError('โหลดข้อมูลคำร้องไม่สำเร็จ');
      }
    };


    Promise.all([fetchStudents(), fetchCourseTransfer()]).finally(() => setLoading(false));
  }, [])

  const allStudents = students.length;
  const pendingCount = status.pending.length;
  const approvedCount = status.approved.length;
  const rejectedCount = status.rejected.length;

  const stats = [
    { label: 'นักศึกษาทั้งหมด', value: allStudents, unit: 'คน', icon: UsersIcon, tile: 'bg-navy-50 text-navy-700' },
    { label: 'รอการอนุมัติ', value: pendingCount, unit: 'วิชา', icon: ClockIcon, tile: 'bg-gold-50 text-gold-600' },
    { label: 'อนุมัติแล้ว', value: approvedCount, unit: 'วิชา', icon: CheckCircleIcon, tile: 'bg-emerald-50 text-emerald-600' },
    { label: 'ถูกปฏิเสธ', value: rejectedCount, unit: 'วิชา', icon: XCircleIcon, tile: 'bg-red-50 text-red-600' },
  ];

  // getcoursetransfer only has ids, so look the course and student up in the students response
  const courseById = new Map();
  students.forEach((s) => (s.StudentCourse || []).forEach((c) => courseById.set(c.id, { ...c, studentName: s.name })));
  const recent = [...transfers]
    .sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted))
    .slice(0, 5)
    .map((t) => ({ ...t, course: courseById.get(t.originalCourseId) }));

  return (
    <div className="space-y-6">
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, unit, icon: Icon, tile }) => (
          <div key={label} className="stat flex-col-reverse gap-3 p-4 sm:flex-row sm:gap-4 sm:p-6">
            <div className="min-w-0">
              <p className="stat-label">{label}</p>
              <p className="stat-value">
                {loading ? <span className="text-slate-300">–</span> : value}
                <span className="ml-1.5 text-sm font-normal text-slate-500">{unit}</span>
              </p>
            </div>
            <span className={`stat-icon ${tile}`}><Icon aria-hidden="true" /></span>
          </div>
        ))}
      </div>

      <section className="card" aria-labelledby="recent-title">
        <div className="card-head">
          <h2 id="recent-title" className="card-title">คำร้องล่าสุด</h2>
          {!loading && transfers.length > 0 && (
            <span className="text-xs text-slate-500">ทั้งหมด <span className="num">{transfers.length}</span> คำร้อง</span>
          )}
        </div>
        {loading ? (
          <p className="px-5 py-6 text-sm text-slate-500 sm:px-6">กำลังโหลดข้อมูล…</p>
        ) : recent.length === 0 ? (
          <EmptyState icon={InboxIcon} title="ยังไม่มีคำร้อง" />
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((t) => {
              const inner = (
                <>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-baseline gap-x-2 text-sm">
                      <span className="code">{t.course?.courseCode || '-'}</span>
                      <span className="font-medium text-slate-900">{t.course?.courseName || '-'}</span>
                    </p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{t.course?.studentName || '-'}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1 sm:flex-row sm:items-center sm:gap-4">
                    <StatusBadge status={t.status} />
                    <span className="text-xs text-slate-500 sm:w-24 sm:text-right">{thaiDate(t.dateSubmitted)}</span>
                  </div>
                </>
              );
              return (
                <li key={t.id}>
                  {t.course?.courseCode ? (
                    <Link to={`/detail/${t.course.courseCode}`} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50 sm:px-6">
                      {inner}
                      <ChevronRightIcon className="hidden h-4 w-4 shrink-0 text-slate-400 sm:block" aria-hidden="true" />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-3 px-5 py-3.5 sm:px-6">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>

  );
};

export default Dashboard;
