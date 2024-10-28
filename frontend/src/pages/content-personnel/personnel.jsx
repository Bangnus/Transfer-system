import React, { useState, useEffect } from 'react'
import Navnar from '../../components/connent-navbar/navbar'
import Dashboard from '../content-dashboard/dashboard';
import Manege from '../content-managecourse/managecourse'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BellIcon as BellIconOutline } from '@heroicons/react/24/outline';
import { BellIcon as BellIconSolid } from '@heroicons/react/24/solid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
dayjs.extend(relativeTime);

const Personnel = () => {
  const [currenPage, setCurrenPage] = useState('dashboard');
  const [notify, setNotify] = useState([]);
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
    fetchNotify();

    const interval = setInterval(fetchNotify, 8000);
    return () => clearInterval(interval)
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
        prevNotify.map((notification) => notification.id === notificationId ? { ...notification, isRead: true } : notification)
      )

    } catch (error) {
      console.error('Error Notification as Read', error)
    }
  };
  // console.log(notify)
  return (
    <>
      <div>
        <Navnar />
      </div>
      {/* Notify */}
      <div className="bg-blue-50 p-3 shadow-sm flex items-center ">
        <div className="flex-grow"></div>
        <div className="relative">
          <button
            onClick={() => setShownotify(!shownotify)}
            className='relative mr-5'
          >
            {shownotify ? (
              <BellIconSolid className='w-6 text-customBlue' />
            ) : (
              <BellIconOutline className='w-6 text-customBlue' />
            )}
            {unreadNotifications.length > 0 && !shownotify && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs'>
                {notificationCount}
              </span>
            )}
          </button>

          {shownotify && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-10">
              <div className="p-2 font-bold text-gray-700">Notifications</div>
              <hr />
              <ul>
                {unreadNotifications.length > 0 ? (
                  unreadNotifications.map((notification) => (
                    <Link
                      to={`/detail/${notification?.studentcourse?.courseCode}`}
                      key={notification.id}
                      onClick={() => handleUpdateNotify(notification.id)}
                    >
                      <li className="p-2 border-b last:border-none cursor-pointer">
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

              {notify.length > 5 && (
                <button
                  onClick={() => setShownotify(!shownotify)}
                  className="w-full p-2 text-blue-500 hover:underline"
                >
                  See all
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-2">
        <button onClick={() => setCurrenPage('dashboard')} className="">Dashboard</button>
        <button onClick={() => setCurrenPage('manege')} className="">Manage</button>
      </div>

      <div className="mt-5">
        {renderPage()}
      </div>
    </>
  )
}

export default Personnel;

