import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/connent-navbar/navbar';
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux';
import axios from 'axios';

const Transfer = () => {
  const [selecteddetail, setSelecteddetail] = useState(null)
  const user = useSelector((state) => state.user.user);
  const username = user?.username;
  const [data, setData] = useState([]);

  const opendetail = (transfer) => {
    setSelecteddetail(transfer === selecteddetail ? null : transfer);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/subject/coursetransfer', {
          params: { username },
        });
        setData(res.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  return (
    <div>
      <Navbar />
      <h1>การเทียบโอนรายวิชา</h1>
      <Link to="/course">
        <Button color="blue">
          เพิ่มวิชาเทียบโอน
        </Button>
      </Link>

      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3">รหัสวิชา</th>
            <th className="px-6 py-3">ชื่อวิชา</th>
            <th className="px-6 py-3">ท:ป</th>
            <th className="px-6 py-3">สถานะ</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((transfer) => (
            <tr key={transfer.id}>
              <td className="px-6 py-4">{transfer.Course?.courseCode || transfer.SpecialCourse?.courseCode}</td>
              <td className="px-6 py-4">{transfer.Course?.courseNameTH || transfer.SpecialCourse?.courseNameTH}</td>
              <td className="px-6 py-4">{transfer.Course?.credit || transfer.SpecialCourse?.credit}</td>
              <td className="px-6 py-4">{transfer.status}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => opendetail(transfer)}
                  className="bg-blue-500 text-white rounded-md px-2 py-1"
                >
                  รายละเอียด
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selecteddetail && (
        <div className="bg-gray-500 ">
          <div className="">รายละเอียด</div>
          <div className="w-1/2">
            {selecteddetail?.Course?.group?.name}
            <div className="">
              รหัสวิชา:
              {selecteddetail?.Course?.courseCode || selecteddetail?.SpecialCourse?.courseCode}
            </div>
            <div className="">
              ชื่อวิชา:
              {selecteddetail?.Course?.courseNameTH || selecteddetail?.SpecialCourse?.courseNameTH}
            </div>
            <div className="">
              หน่วยกิต:
              {selecteddetail?.Course?.credit || selecteddetail?.SpecialCourse?.credit}
            </div>
            <div className="">
              คำอธิบายวิชา:
              {selecteddetail?.Course?.descriptionTH || selecteddetail?.SpecialCourse?.descriptionTH}
            </div>
          </div>

          <div className="w-1/2"></div>
        </div>
      )}
    </div>
  );
};

export default Transfer;
