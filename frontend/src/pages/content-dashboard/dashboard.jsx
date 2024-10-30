import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {

  const [students, setStudents] = useState([])
  // const [status, setStatus] = useState([]);
  const [status, setStatus] = useState({
    pending: [],
    approved: [],
    rejected: [],
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/manage/students`)
        setStudents(res.data)
      } catch (error) {
        console.error('Fail fetching Students')
      }
    };
    const fetchCourseTransfer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/transsfer/getcoursetransfer`);

        // แยกข้อมูลตามสถานะ
        const pending = res.data.filter(item => item.status === 'PENDING');
        const approved = res.data.filter(item => item.status === 'APPROVED');
        const rejected = res.data.filter(item => item.status === 'REJECTED');

        // อัพเดตสถานะ
        setStatus({
          pending,
          approved,
          rejected,
        });
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };


    fetchStudents()
    fetchCourseTransfer()
  }, [])

  const allStudents = students.length;
  const pendingCount = status.pending.length;
  const approvedCount = status.approved.length;
  const rejectedCount = status.rejected.length;
  return (
    <div className="container  p-4 animate-fade-up animate-once animate-ease-out animate-normal animate-fill-forwards">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="flex justify-around items-center gap-x-5 xs:flex-col xs:w-full xs:space-y-5 sm:flex-col sm:space-y-7 md:flex-col md:space-y-10">
        <div className="bg-blue-500 flex flex-col items-center justify-center rounded-lg shadow-lg text-white p-10 w-1/4 xs:w-full sm:w-full md:w-full lg:p-7 ">
          <div className="text-xl font-semibold lg:text-[16px] xl:text-[18px]">นักศึกษาทั้งหมด</div>
          <div className="text-2xl mt-2 lg:text-[20px] xl:text-[20px]">จำนวน: {allStudents} คน</div>
        </div>
        <div className="bg-orange-500 flex flex-col items-center justify-center rounded-lg shadow-lg text-white p-10 w-1/4 xs:w-full  sm:w-full md:w-full lg:p-7">
          <div className="text-xl font-semibold lg:text-[16px] xl:text-[18px]">วิชาที่รอการอนุมัติ</div>
          <div className="text-2xl mt-2 lg:text-[20px] xl:text-[20px]">จำนวน: {pendingCount} วิชา</div>
        </div>
        <div className="bg-green-500 flex flex-col items-center justify-center rounded-lg shadow-lg text-white p-10 w-1/4 xs:w-full  sm:w-full md:w-full lg:p-7">
          <div className="text-xl font-semibold lg:text-[16px] xl:text-[18px]">วิชาที่ผ่านการอนุมัติ</div>
          <div className="text-2xl mt-2 lg:text-[20px] xl:text-[20px]">จำนวน: {approvedCount} วิชา</div>
        </div>
        <div className="bg-red-500 flex flex-col items-center justify-center rounded-lg shadow-lg text-white p-10 w-1/4 xs:w-full  sm:w-full md:w-full lg:p-7">
          <div className="text-xl font-semibold lg:text-[16px] xl:text-[18px]">วิชาที่ถูกปฏิเสธ</div>
          <div className="text-2xl mt-2 lg:text-[20px] xl:text-[20px]">จำนวน: {rejectedCount} วิชา</div>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
