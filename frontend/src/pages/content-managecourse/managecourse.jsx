import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Managecourse = () => {
    const [selectedStudentCourse, setSelectedStudentCourse] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/manage/students');
                setStudents(res.data);
            } catch (error) {
                console.error('Error fetching Students', error);
            }
        };

        fetchStudent();
        const interval = setInterval(fetchStudent, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleSelectStudentCourse = (student) => {
        setSelectedStudentCourse(student === selectedStudentCourse ? null : student);
    };

    return (
        <div className="flex mx-2 animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-forwards">
            <div className="w-1/3 bg-white rounded-md shadow-sm p-4">
                <h2 className="text-xl font-semibold mb-4">นักศึกษา</h2>
                {students && students.length > 0 ? (
                    students.map((student, index) => (
                        <div className="flex items-center justify-between py-2 border-b last:border-none" key={student.id}>
                            <p className="text-gray-700">
                                {index + 1}. {student.name} (รหัสนักศึกษา: {student.username})
                            </p>
                            <button
                                className='bg-blue-500 text-white px-4 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300'
                                onClick={() => handleSelectStudentCourse(student)}
                            >
                                เลือก
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">ไม่มีข้อมูล</p>
                )}
            </div>
                {selectedStudentCourse && (
            <div className="w-2/3 bg-white rounded-md shadow-sm p-4 ml-4 animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-forwards">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">{selectedStudentCourse.name} - วิชาที่เทียบโอน</h2>
                        {selectedStudentCourse.StudentCourse && selectedStudentCourse.StudentCourse.length > 0 ? (
                            <table className='min-w-full rounded-lg bg-white'>
                                <thead className='text-white bg-blue-500'>
                                    <tr>
                                        <th className='px-6 py-2 text-left font-semibold'>รหัสวิชา</th>
                                        <th className='px-6 py-2 text-left font-semibold'>ชื่อวิชา</th>
                                        <th className='px-6 py-2 text-center font-semibold'>หน่วยกิต</th>
                                        <th className='px-6 py-2 text-center font-semibold'>สถานะ</th>
                                        <th className='px-6 py-2'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedStudentCourse.StudentCourse.map((Course) => (
                                        <tr className='border-b hover:bg-gray-200 ' key={Course.id}>
                                            <td className='px-6 py-2 text-left'>{Course.courseCode}</td>
                                            <td className='px-6 py-2 text-left'>{Course.courseName}</td>
                                            <td className='px-6 py-2 text-center'>{Course.credit}</td>
                                            <td className='px-6 py-2 text-center'>
                                                {Course.courseTransfers && Course.courseTransfers.map((Coursetransfer) => (
                                                    <div key={Coursetransfer.id} className={`inline-block px-2 rounded-full text-white ${Coursetransfer.status === 'PENDING' ? 'bg-orange-500' : Coursetransfer.status === 'APPROVED' ? 'bg-green-500' : Coursetransfer.status === 'REJECTED' ? 'bg-red-500' : ''}`}>
                                                        {Coursetransfer.status === 'PENDING' ? 'รอดำเนินการ' : Coursetransfer.status === 'APPROVED' ? 'ได้รับการอนุมัติ' : Coursetransfer.status === 'REJECTED' ? 'ถูกปฏิเสธ' : Coursetransfer.status}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className='px-4 py-2 text-center'>
                                                <Link to={`/detail/${Course.courseCode}`}>
                                                    <button className='bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition duration-300'>
                                                        เลือก
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className='text-center text-red-500'>ไม่มีข้อมูล</p>
                        )}
                    </div>
            </div>
                )}
        </div>
    );
};

export default Managecourse;
