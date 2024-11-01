import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/connent-navbar/navbar';
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import BreadcrumbsCustom from '../../components/content-Breadcrumbs/Breadcrumbs';
import ConfirmDeleteModal from '../../components/content-Alert/ConfirmDeleteModal';

const Transfer = () => {
  const navigate = useNavigate();
  const [selectedDetail, setSelectedDetail] = useState(null);
  const user = useSelector((state) => state.user.user);
  const username = user?.username;
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transferId, setTransferId] = useState(null);

  const openDetail = (transfer) => {
    setSelectedDetail(transfer === selectedDetail ? null : transfer); // เปิด/ปิดข้อมูล
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
      const interval = setInterval(fetchData, 60000);
      return () => clearInterval(interval);
    }
  }, [username]);

  const handleDeleteClick = (id) => {
    setTransferId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/subject/deletecoursetransfer/${transferId}`);
      setData((prevData) => prevData.filter((course) => course.id !== transferId));
      setIsModalOpen(false);
      navigate('/tranfer');
    } catch (error) {
      console.error('Error deleting data', error);
    }
  };

  const breadcrumbLinks = [
    { label: "Home", to: "/" },
    { label: "Transfer" }
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-blue-50 p-2 rounded-md shadow-sm ">
        <BreadcrumbsCustom links={breadcrumbLinks} />
      </div>
      <div className="container mx-auto p-4 animate-fade animate-once animate-ease-in animate-normal">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 xs:text-[24px]">การเทียบโอนรายวิชา</h1>
        <div className="flex justify-between items-center mb-4 ">
          <Link to="/course">
            <Button color="blue" className='xs:px-2 xs:py-2 xs:text-[10px]'>เพิ่มวิชาเทียบโอน</Button>
          </Link>
        </div>

        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold xs:text-[12px] xs:px-1 xs:py-1 sm:text-[14px] sm:px-2">รหัสวิชา</th>
                <th className="px-6 py-3 text-left font-semibold xs:text-[12px] xs:px-1 xs:py-1 sm:text-[14px] sm:px-2">ชื่อวิชา</th>
                <th className="px-6 py-3 text-center font-semibold xs:text-[12px] xs:px-1 xs:py-1 sm:text-[14px] sm:px-2">ท:ป</th>
                <th className="px-6 py-3 text-center font-semibold xs:text-[12px] xs:px-1 xs:py-1 sm:text-[14px] sm:px-2">สถานะ</th>
                <th className="px-6 py-3 sm:px-2"></th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 ? (
                data.map((transfer) => (
                  <React.Fragment key={transfer.id}>
                    <tr className="border-b hover:bg-gray-200">
                      <td className="px-6 py-4 xs:text-[12px] xs:px-1 xs:py-0 sm:text-[14px] sm:px-2">{transfer.Course?.courseCode || transfer.SpecialCourse?.courseCode}</td>
                      <td className="px-6 py-4 xs:text-[12px] xs:px-1 xs:py-0 sm:text-[14px] sm:px-2">{transfer.Course?.courseNameTH || transfer.SpecialCourse?.courseNameTH}</td>
                      <td className="px-6 py-4 xs:text-[12px] xs:px-1 xs:py-0 text-center sm:text-[14px] sm:px-2">{transfer.Course?.credit || transfer.SpecialCourse?.credit}</td>
                      <td className="px-6 py-4 xs:text-[12px] xs:px-1 xs:py-0 text-center sm:text-[14px] sm:px-2">
                        <span
                          className={`px-2 py-1 xs:text-[12px] xs:px-1 xs:py-1  rounded-full text-white ${transfer.status === 'PENDING' ? 'bg-orange-500' :
                            transfer.status === 'APPROVED' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        >
                          {transfer.status === 'PENDING' ? 'รอดำเนินการ' :
                            transfer.status === 'APPROVED' ? 'ได้รับการอนุมัติ' : 'ถูกปฏิเสธ'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right xs:text-[12px] xs:px-1">
                        <button
                          onClick={() => openDetail(transfer)}
                          className="bg-blue-500 text-white rounded-md px-4 py-2 xs:px-1 xs:py-1 sm:text-[14px] sm:px-2 sm:py-1"
                        >
                          รายละเอียด
                        </button>
                      </td>
                    </tr>

                    {selectedDetail === transfer && (
                      <tr>
                        <td colSpan="5" className="bg-gray-50 px-6 py-4">
                          <div className="flex flex-row gap-4 xs:gap-0 xs:flex-col xs:justify-center xs:items-center">
                            <div className="w-full text-gray-700 xs:text-[12px] border-b border-gray-200 pb-4 mb-4">
                              <h3 className="font-semibold text-blue-600 text-lg xs:text-[14px] mb-2">ข้อมูลวิชา</h3>
                              <p><strong>รหัสวิชา:</strong> {transfer?.Course?.courseCode || transfer?.SpecialCourse?.courseCode}</p>
                              <p><strong>ชื่อวิชา:</strong> {transfer?.Course?.courseNameTH || transfer?.SpecialCourse?.courseNameTH}</p>
                              <p><strong>วิชาบังคับก่อน:</strong> {transfer?.Course?.prerequisiteTH || transfer?.SpecialCourse?.prerequisiteTH || '-'}</p>
                              <p><strong>หน่วยกิต:</strong> {transfer?.Course?.credit || transfer?.SpecialCourse?.credit}</p>
                              <p><strong>คำอธิบายรายวิชา:</strong> {transfer?.Course?.descriptionTH || transfer?.SpecialCourse?.descriptionTH}</p>
                              <p><strong>สถานะการโอนย้าย:</strong>
                                <span className={`ml-2 px-2 py-1 rounded-full text-white xs:px-0 xs:py-0 xs:text-[10px]
                               ${transfer.status === 'PENDING' ? 'bg-orange-500' :
                                    transfer.status === 'APPROVED' ? 'bg-green-500' :
                                      transfer.status === 'REJECTED' ? 'bg-red-500' : 'bg-gray-300'
                                  }`}>
                                  {transfer.status === 'PENDING' ? 'รอดำเนินการ' :
                                    transfer.status === 'APPROVED' ? 'ได้รับการอนุมัติ' :
                                      transfer.status === 'REJECTED' ? 'ถูกปฏิเสธ' : transfer.Course.status}
                                </span>
                              </p>
                              <p><strong>คำอธิบาย:</strong> {transfer.description || '- '}</p>
                            </div>

                            <div className="w-full text-gray-700 xs:text-[12px]">
                              <h3 className="font-semibold text-blue-600 text-lg xs:text-[14px] mb-2">ข้อมูลวิชาของนักศึกษา</h3>
                              <p><strong>รหัสวิชา:</strong> {transfer?.student?.courseCode}</p>
                              <p><strong>ชื่อวิชา:</strong> {transfer?.student?.courseName}</p>
                              <p><strong>หน่วยกิต:</strong> {transfer?.student?.credit}</p>
                              <p><strong>เกรด:</strong> {transfer?.student?.grade}</p>
                              <p><strong>คำอธิบายรายวิชา:</strong> {transfer?.student?.description}</p>

                              <div className="flex gap-3 mt-4">
                                <Link to={`/edit/${transfer?.student?.id}`}>
                                  <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200'>
                                    แก้ไขข้อมูล
                                  </button>
                                </Link>
                                <button
                                  onClick={() => handleDeleteClick(transfer.id)}
                                  className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200'
                                >
                                  ลบข้อมูล
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">ไม่มีข้อมูล</td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* แสดง Modal ยืนยันการลบ */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Transfer;
