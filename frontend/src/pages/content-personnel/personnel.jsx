import React, { useState, useEffect } from 'react';
import Navbar from '../../components/connent-navbar/navbar';
import Dashboard from '../content-dashboard/dashboard';
import Manege from '../content-managecourse/managecourse';
import axios from 'axios';
import { BellIcon as BellIconOutline } from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
dayjs.extend(relativeTime);

const Personnel = () => {
  const [currenPage, setCurrenPage] = useState('dashboard');
  const [notify, setNotify] = useState([]);
  const [student, setStudent] = useState([]);
  const [shownotify, setShownotify] = useState(false);

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

  return (
    <>
      <Navbar />
      {/* Notify */}
      <div className="bg-blue-50 p-3 shadow-sm flex items-center">
        <div className="flex-grow"></div>
        <div className="relative">
          <button
            onClick={() => setShownotify(!shownotify)}
            className="relative mr-5 focus:outline-none"
          >
            {shownotify ? (
              <BellIconSolid className="w-6 text-customBlue" />
            ) : (
              <BellIconOutline className="w-6 text-customBlue" />
            )}
            {unreadNotifications.length > 0 && !shownotify && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">
                {notificationCount}
              </span>
            )}
          </button>

          {shownotify && (
            <div className="fixed inset-0  z-50"
              onClick={() => setShownotify(false)}
            >
              <div className="absolute right-0 mt-24 mr-7 rounded-md px-1 bg-white border border-gray-200 shadow-lg z-10 max-h-screen overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2 font-bold text-gray-700">การเเจ้งเตือน</div>
                <hr />
                <ul>
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.map((notification) => (
                      <Link
                        to={`/detail/${notification?.studentcourse?.courseCode}`}
                        key={notification.id}
                        onClick={() => handleUpdateNotify(notification.id)}
                      >
                        <li className="p-2 border-b last:border-none cursor-pointer hover:bg-gray-100 transition">
                          <div className="text-sm">
                            {notification?.user?.name} {notification.message}
                          </div>
                          <div className="text-xs text-gray-500 text-left">
                            {dayjs(notification.createdAt).fromNow()}
                          </div>
                        </li>
                      </Link>
                    ))
                  ) : (
                    <li className="p-2 text-gray-500">ไม่มีการเเจ้งเตือน</li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-5 flex justify-start ml-2 space-x-4 animate-fade-right animate-once animate-ease-in-out animate-normal animate-fill-forwards">
        <button
          onClick={() => setCurrenPage('dashboard')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => setCurrenPage('manege')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Manage
        </button>
      </div>

      {/* Content */}
      <div className="mt-5">
        {renderPage()}
      </div>
    </>
  );
};

export default Personnel;
