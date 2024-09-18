import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Navbar from '../../components/connent-navbar/navbar'

const StudentPage = () => {
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user && user.type === 'student') {
      axios.get(`http://localhost:5000/api/authenticate/user/${user.id}`)
        .catch(error => setError('Failed to fetch user data'));
    }
  }, [user]);
  // console.log(user)

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

  );
};

export default StudentPage;
