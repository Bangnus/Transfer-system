import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/connent-navbar/navbar';
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Transfer = () => {
  const [selecteddetail, setSelecteddetail] = useState(null);
  const user = useSelector((state) => state.user.user);
  const username = user?.username;
  const [data, setData] = useState([]);

  const opendetail = (transfer) => {
    setSelecteddetail(transfer === selecteddetail ? null : transfer); // เปิด/ปิดข้อมูล
  };

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

      <table className="min-w-full mt-4">
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
            <React.Fragment key={transfer.id}>
              <tr>
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

              {/* แสดงข้อมูลเฉพาะแถวที่ถูกเลือก */}
              {selecteddetail === transfer && (
                <tr>
                  <td colSpan="5" className="bg-gray-100 px-6 py-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="w-full md:w-1/2 mb-4 md:mb-0 p-2">
                        <h3 className="font-semibold">ข้อมูลวิชา</h3>
                        <p>รหัสวิชา: {transfer?.Course?.courseCode || transfer?.SpecialCourse?.courseCode}</p>
                        <p>ชื่อวิชา: {transfer?.Course?.courseNameTH || transfer?.SpecialCourse?.courseNameTH}</p>
                        <p>หน่วยกิต: {transfer?.Course?.credit || transfer?.SpecialCourse?.credit}</p>
                        <p>คำอธิบายวิชา: {transfer?.Course?.descriptionTH || transfer?.SpecialCourse?.descriptionTH}</p>
                      </div>

                      <div className="w-full md:w-1/2 p-2">
                        <h3 className="font-semibold">ข้อมูลวิชาของนักศึกษา</h3>
                        <p>รหัสวิชา: {transfer?.student?.courseCode}</p>
                        <p>ชื่อวิชา: {transfer?.student?.courseName}</p>
                        <p>หน่วยกิต: {transfer?.student?.credit}</p>
                        <p>เกรด: {transfer?.student?.grade}</p>
                        <p>คำอธิบายวิชา: {transfer?.student?.description}</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transfer;
