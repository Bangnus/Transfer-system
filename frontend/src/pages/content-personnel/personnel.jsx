import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Dashboard from '../content-dashboard/dashboard';
import Manege from '../content-managecourse/managecourse';
import axios from 'axios';
import { BellIcon as BellIconOutline, BellSlashIcon, ChartBarSquareIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/th';
import { Link } from 'react-router-dom';
dayjs.extend(relativeTime);

// Time ago in Thai; a timestamp slightly ahead of this device's clock reads as "just now"
const timeAgo = (value) => {
  const t = dayjs(value);
  return (t.isAfter(dayjs()) ? dayjs() : t).locale('th').fromNow();
};

const TABS = [
  { value: 'dashboard', label: 'ภาพรวม', icon: ChartBarSquareIcon },
  { value: 'manege', label: 'จัดการคำร้อง', icon: ClipboardDocumentListIcon },
];

const Personnel = () => {
  const [currenPage, setCurrenPage] = useState('dashboard');
  const [notify, setNotify] = useState([]);
  const [student, setStudent] = useState([]);
  const [shownotify, setShownotify] = useState(false);
  const notifyRef = useRef(null);
  const bellRef = useRef(null);

  useEffect(() => {
    const fetchNotify = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/notify/notifications`);
        setNotify(res.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchStudent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/manage/students`);
        setStudent(res.data);
      } catch (error) {
        console.error('Error fetching Students', error);
      }
    };

    fetchNotify();
    fetchStudent();
    const interval = setInterval(fetchNotify, 8000);
    return () => clearInterval(interval);
  }, []);

  // Close the popover on an outside click or Escape
  useEffect(() => {
    if (!shownotify) return undefined;
    const onDown = (e) => {
      if (notifyRef.current && !notifyRef.current.contains(e.target)) setShownotify(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShownotify(false);
        bellRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [shownotify]);

  const renderPage = () => {
    if (currenPage === 'dashboard') {
      return <Dashboard />;
    } else if (currenPage === 'manege') {
      return <Manege />;
    }
  };

  const unreadNotifications = notify.filter(notification => !notification.isRead);
  const notificationCount = unreadNotifications.length > 9 ? '9+' : unreadNotifications.length;

  const handleUpdateNotify = async (notificationId) => {
    try {
      await axios.put(`http://localhost:5000/api/notify/notification/${notificationId}`);
      setNotify((prevNotify) =>
        prevNotify.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read', error);
    }
  };

  const BellIcon = shownotify ? BellIconSolid : BellIconOutline;

  return (
    <AppLayout>
      <div className="page-head relative flex-row items-start justify-between sm:items-end">
        <div className="min-w-0">
          <h1 className="page-title">งานเทียบโอนรายวิชา</h1>
          <p className="page-sub">ภาพรวมและคำร้องขอเทียบโอนรายวิชาของนักศึกษา</p>
        </div>

        {/* Notifications: the popover anchors to the header on phones (full width) and to the bell from sm up */}
        <div ref={notifyRef} className="shrink-0 sm:relative">
          <button
            ref={bellRef}
            type="button"
            onClick={() => setShownotify(!shownotify)}
            className={`icon-btn relative border border-slate-200 bg-white ${shownotify ? 'text-navy-900' : ''}`}
            aria-label={unreadNotifications.length > 0 ? `การแจ้งเตือน ยังไม่ได้อ่าน ${unreadNotifications.length} รายการ` : 'การแจ้งเตือน'}
            title="การแจ้งเตือน"
            aria-haspopup="true"
            aria-expanded={shownotify}
            aria-controls="notify-popover"
          >
            <BellIcon aria-hidden="true" />
            {unreadNotifications.length > 0 && (
              <span className="num absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold-400 px-1 text-[11px] font-semibold leading-none text-navy-950 ring-2 ring-slate-50" aria-hidden="true">
                {notificationCount}
              </span>
            )}
          </button>

          {shownotify && (
            <div
              id="notify-popover"
              className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-pop sm:left-auto sm:right-0 sm:w-96"
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-900">การแจ้งเตือน</h2>
                {unreadNotifications.length > 0 && (
                  <span className="badge-pending">ยังไม่ได้อ่าน {unreadNotifications.length}</span>
                )}
              </div>
              {unreadNotifications.length > 0 ? (
                <ul className="max-h-[60vh] divide-y divide-slate-100 overflow-y-auto">
                  {unreadNotifications.map((notification) => (
                    <li key={notification.id}>
                      <Link
                        to={`/detail/${notification?.studentcourse?.courseCode}`}
                        onClick={() => handleUpdateNotify(notification.id)}
                        className="flex gap-3 px-4 py-3 transition-colors hover:bg-slate-50"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-400" title="ยังไม่ได้อ่าน" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm text-slate-700">
                            <span className="font-medium text-slate-900">{notification?.user?.name || '-'}</span>{' '}
                            {notification.message}
                          </span>
                          {notification?.studentcourse?.courseCode && (
                            <span className="mt-0.5 block truncate text-xs text-slate-500">
                              <span className="code text-xs">{notification.studentcourse.courseCode}</span>
                              {notification.studentcourse.courseName ? ` ${notification.studentcourse.courseName}` : ''}
                            </span>
                          )}
                          <span className="mt-1 block text-xs text-slate-400">
                            {timeAgo(notification.createdAt)}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="empty-state py-10">
                  <BellSlashIcon aria-hidden="true" />
                  <p className="font-medium text-slate-700">ไม่มีการแจ้งเตือน</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Local tabs */}
      <div role="tablist" aria-label="งานเทียบโอน" className="mb-6 flex gap-6 border-b border-slate-200">
        {TABS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            role="tab"
            id={`tab-${value}`}
            aria-selected={currenPage === value}
            aria-controls="personnel-panel"
            onClick={() => setCurrenPage(value)}
            className={`tab-link -mb-px min-h-[40px]${currenPage === value ? ' is-active' : ''}`}
          >
            <Icon aria-hidden="true" />{label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div id="personnel-panel" role="tabpanel" aria-labelledby={`tab-${currenPage}`}>
        {renderPage()}
      </div>
    </AppLayout>
  );
};

export default Personnel;
