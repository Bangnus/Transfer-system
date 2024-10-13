import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/connent-navbar/navbar'
import Table from '../../components/content-tables/tables'
import Button from '../../components/content-button/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
const Transfer = () => {
  const user = useSelector((state) => state.user.user);
  const username = user?.username;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/subject/coursetransfer', {
          params: { username }
        })
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data', error)
      }
    };

    if (username) {
      fetchData();
    }
  }, [username])
  return (
    <div>
      <Navbar />
      <h1>การเทียบโอนรายวิชา</h1>
      <Link to='/course'>
        <Button label='เพิ่มวิชาเทียบโอน' />
      </Link>

      <table>
        <thead>
          <tr>
            <th>รหัสวิชา</th>
            <th>ชื่อวิชา</th>
            <th>ท:ป</th>
            <th>สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((tranfer) => (
            <tr key={tranfer.id}>
              <td>{tranfer.Course?.courseCode}</td>
              <td>{tranfer.Course?.courseNameTH}</td>
              <td>{tranfer.Course?.credit}</td>
              <td>{tranfer.status }</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default Transfer