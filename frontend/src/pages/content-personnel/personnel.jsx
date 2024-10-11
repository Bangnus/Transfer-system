import React, { useState } from 'react'
import Navnar from '../../components/connent-navbar/navbar'
import Dashboard from '../content-dashboard/dashboard';
import Manege from '../content-managecourse/managecourse'
const personnel = () => {
  const [currenPage, setCurrenPage] = useState('dashboard');

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
      <div className="flex justify-center">
        <div className="w-1/2 flex justify-center">
          <button onClick={() => setCurrenPage('dashboard')}>Dashboard</button>
        </div>
        <div className="w-1/2 flex justify-center">
          <button onClick={() => setCurrenPage('manege')}>Manage</button>
        </div>
      </div>

      <div className="">
        {renderPage()}
      </div>
    </>
  )
}

export default personnel