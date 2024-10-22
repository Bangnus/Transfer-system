import React, { useState, useEffect } from 'react'
import Navnar from '../../components/connent-navbar/navbar'
import Dashboard from '../content-dashboard/dashboard';
import Manege from '../content-managecourse/managecourse'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { BellIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const personnel = () => {
  const [currenPage, setCurrenPage] = useState('dashboard');
  // const [notify, setNotify] = useState([]);
  // const [shownotify, setShownotify] = useState(false);

  // useEffect(() => {
  //   const fetchNotify = async () => {
  //     try {
  //       const res = await axios.get(`http://localhost:5000/api/notify/notifications`);
  //       setNotify(res.data);
  //     } catch (error) {
  //       console.error('Error fetching notifications:', error);
  //     }
  //   }

  // }, [])




  const renderPage = () => {
    if (currenPage === 'dashboard') {
      return <Dashboard />;
    } else if (currenPage === 'manege') {
      return <Manege />;
    }
  };
  return (
    <>
      <div>
        <Navnar />
      </div>
    {/* Notify */}
      <div className="bg-blue-50 p-3 shadow-sm flex items-center ">
        {/* <div className="flex-grow"></div> */}
        {/* <div className="relative "> */}
        {/* <button onClick={() => setShownotify(!shownotify)} className='relative mr-5'>
            <BellIcon className=' w-6  text-customBlue ' />
            {notify.length > 0 && (
              <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs'>
                {notify.length}
              </span>
            )}
          </button> */}

        {/* {shownotify && notify.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg z-10">
              <div className="p-2 font-bold text-gray-700">Notifications</div>
              <ul>
                {notify.map((notification) => (
                  <li key={notification.id} className="p-2 border-b last:border-none">
                    <div className="text-sm">
                      {user?.name} {notification.message}
                    </div>
                    <div className="text-xs text-gray-500">
                      {dayjs(notification.createdAt).fromNow()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )} */}
        {/* </div> */}
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

export default personnel