import React, { useEffect, useState } from 'react'
import Navbar from '../components/connent-navbar/navbar'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const personnel = () => {
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/');
    } else if (user && user.type === 'personnel'){
      axios.get(`http://localhost:5000/api/authenticate/user/${user.id}`)
      .catch(error => setError('Failed to fetch user data'));
    }
  },[user, navigate]);
  return (
    <>
     <Navbar username={user?.username} />
      <div className="p-8">
        {error && <p className="text-red-500">{error}</p>}
        {user ? (
          <div>
            <h1>Welcome, {user.name}</h1>
            <p>Details: {user.secname}</p>
            {/* Add more user-specific details here */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}

export default personnel