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
        <div className="flex mx-2 xs:flex-col animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-forwards">
            <div className="w-1/3 bg-white rounded-md shadow-sm p-4 xs:p-0 xs:w-full">
                <h2 className="text-xl font-semibold mb-4 xs:mb-0 xs:text-[16px]">นักศึกษา</h2>
                {students && students.length > 0 ? (
                    students.map((student, index) => (
                        <div className="flex items-center justify-between py-2 border-b last:border-none xs:text-[12px]" key={student.id}>
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
            <div className="w-2/3 bg-white rounded-md shadow-sm p-4 ml-4 xs:w-full xs:ml-0 xs:p-0 animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-forwards">
                    <div>
                        <h2 className="text-xl font-semibold mb-4 xs:mb-1 xs:text-[16px]">{selectedStudentCourse.name} - วิชาที่เทียบโอน</h2>
                        {selectedStudentCourse.StudentCourse && selectedStudentCourse.StudentCourse.length > 0 ? (
                            <table className='min-w-full rounded-lg bg-white xs:text-[12px]'>
                                <thead className='text-white bg-blue-500'>
                                    <tr>
                                        <th className='px-6 py-2 text-left font-semibold xs:px-1'>รหัสวิชา</th>
                                        <th className='px-6 py-2 text-left font-semibold xs:px-1'>ชื่อวิชา</th>
                                        <th className='px-6 py-2 text-center font-semibold xs:px-1'>หน่วยกิต</th>
                                        <th className='px-6 py-2 text-center font-semibold xs:px-1'>สถานะ</th>
                                        <th className='px-6 py-2'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedStudentCourse.StudentCourse.map((Course) => (
                                        <tr className='border-b hover:bg-gray-200 ' key={Course.id}>
                                            <td className='px-6 py-2 text-left xs:px-1'>{Course.courseCode}</td>
                                            <td className='px-6 py-2 text-left xs:px-1'>{Course.courseName}</td>
                                            <td className='px-6 py-2 text-center xs:px-1'>{Course.credit}</td>
                                            <td className='px-6 py-2 text-center xs:px-1'>
                                                {Course.courseTransfers && Course.courseTransfers.map((Coursetransfer) => (
                                                    <div key={Coursetransfer.id} className={`inline-block px-2 rounded-full text-white xs:px-1  xs:text-[10px] ${Coursetransfer.status === 'PENDING' ? 'bg-orange-500' : Coursetransfer.status === 'APPROVED' ? 'bg-green-500' : Coursetransfer.status === 'REJECTED' ? 'bg-red-500' : ''}`}>
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
