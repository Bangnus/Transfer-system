import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import Navbar from '../../components/connent-navbar/navbar'

const Detailstudent = () => {
    const navigate = useNavigate()
    const { courseCode } = useParams()
    const [studentdetail, setStudentdetail] = useState(null)
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [selectedTransferId, setSelectedTransferId] = useState(null)

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/manage/course/${courseCode}`);
                setStudentdetail(res.data[0])
            } catch (error) {
                console.error('fetch StudentDetail fail', error)
            }
        };

        if (courseCode) {
            fetchStudentDetail();
        }
    }, [courseCode])

    const handleUpdateStatus = async (transferId) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/manage/status/${transferId}`, {
                description,
                status
            });
            setStudentdetail(prev => ({
                ...prev,
                courseTransfers: prev.courseTransfers.map(transfer =>
                    transfer.id === transferId ? { ...transfer, status, description } : transfer
                )
            }));
            navigate('/personnel')

            setStatus('');
            setDescription('');
            setSelectedTransferId(null);

        } catch (error) {
            console.error('Error updating status:', error);
        }
    }
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">รายละเอียดวิชา</h1>
                <div className="flex gap-6">
                    <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">ข้อมูลรายวิชา</h2>
                        {studentdetail ? (
                            <ul className="text-gray-700 space-y-2">
                                <li><strong>รหัสวิชา:</strong> {studentdetail.courseCode}</li>
                                <li><strong>ชื่อวิชา:</strong> {studentdetail.courseName}</li>
                                <li><strong>หน่วยกิต:</strong> {studentdetail.credit}</li>
                                <li><strong>เกรด:</strong> {studentdetail.grade}</li>
                                <li><strong>คำอธิบายรายวิชา:</strong> {studentdetail.description}</li>
                            </ul>
                        ) : (
                            <p className="text-gray-500">ไม่มีข้อมูลรายวิชา</p>
                        )}
                    </div>

                    <div className="w-1/2 bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-blue-600">ข้อมูลการโอนย้ายวิชา</h2>
                        {studentdetail?.courseTransfers && studentdetail.courseTransfers.length > 0 ? (
                            studentdetail.courseTransfers.map((CourseTransfer) => (
                                <div key={CourseTransfer.id} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <ul className="text-gray-700 space-y-2">
                                        <li><strong>รหัสวิชา:</strong> {CourseTransfer.Course?.courseCode}</li>
                                        <li><strong>ชื่อวิชา (TH):</strong> {CourseTransfer.Course?.courseNameTH}</li>
                                        <li><strong>ชื่อวิชา (ENG):</strong> {CourseTransfer.Course?.courseNameENG}</li>
                                        <li><strong>หน่วยกิต:</strong> {CourseTransfer.Course?.credit}</li>
                                        <li><strong>คำอธิบาย (TH):</strong> {CourseTransfer.Course?.descriptionTH}</li>
                                        <li><strong>คำอธิบาย (ENG):</strong> {CourseTransfer.Course?.descriptionENG}</li>
                                        <li><strong>สถานะการโอนย้าย:</strong>
                                            <span className={`ml-2 px-3 py-1 rounded-full text-white ${CourseTransfer.status === 'PENDING' ? 'bg-orange-500' :
                                                CourseTransfer.status === 'APPROVED' ? 'bg-green-500' :
                                                    CourseTransfer.status === 'REJECTED' ? 'bg-red-500' : 'bg-gray-300'}`}>
                                                {CourseTransfer.status === 'PENDING' ? 'รอดำเนินการ' :
                                                    CourseTransfer.status === 'APPROVED' ? 'ได้รับการอนุมัติ' :
                                                        CourseTransfer.status === 'REJECTED' ? 'ถูกปฏิเสธ' : CourseTransfer.status}
                                            </span>
                                        </li>
                                        <li>
                                            <strong>คำอธิบาย:</strong> {CourseTransfer?.description || 'ไม่มีคำอธิบาย'}
                                        </li>
                                        <li>
                                            <strong>สถานะการโอนย้าย:</strong>
                                            <select
                                                id={`status-select-${CourseTransfer.id}`}
                                                value={selectedTransferId === CourseTransfer.id ? status : CourseTransfer.status}
                                                onChange={(e) => {
                                                    setStatus(e.target.value);
                                                    setSelectedTransferId(CourseTransfer.id);
                                                }}
                                            >
                                                <option value="PENDING">รอดำเนินการ</option>
                                                <option value="APPROVED">ได้รับการอนุมัติ</option>
                                                <option value="REJECTED">ถูกปฏิเสธ</option>
                                            </select>
                                        </li>
                                        <li>
                                            <div className="mb-2">
                                                <strong>คำอธิบาย:</strong>
                                            </div>
                                            <textarea
                                                type="text"
                                                id={`description-${CourseTransfer.id}`}
                                                value={selectedTransferId === CourseTransfer.id ? description : CourseTransfer.description || ''}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="border rounded p-1 w-full"
                                                rows="3"
                                            />
                                        </li>

                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => handleUpdateStatus(CourseTransfer.id)}
                                                className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
                                            >
                                                อัปเดตสถานะ
                                            </button>
                                        </div>


                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">ไม่มีข้อมูลการโอนย้ายรายวิชา</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Detailstudent
