import React, { useEffect, useState } from 'react'
import Button from '../../components/content-button/button'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Managecourse = () => {
    const [selectedStudentCourse, setSelectedStudentCourse] = useState(null)
    const [students, setStudents] = useState()
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/manage/students`);
                setStudents(res.data)
            } catch (error) {
                console.error('Error fetching Students', error)
            }
        }
        fetchStudent()
        // const interval = setInterval(fetchStudent, 8000);
        // return () => clearInterval(interval)
    }, [])

    const handleSelectStudentCourse = (student) => {
        setSelectedStudentCourse(student === selectedStudentCourse ? null : student)
    }
    // console.log(selectedStudentCourse)
    return (
        <>
            {/* <div className="">
                <Link to="/addspecialgroup">
                    <Button label='เพิ่มกลุ่มวิชา' />
                </Link>
            </div> */}
            <div className="flex mx-2">
                <div className="w-1/3">
                    {students && students.length > 0 ? (
                        students.map((student, index) => (
                            <div className="flex items-center" key={student.id}>
                                <p> {index + 1}.{student.name} รหัสนักศึกษา {student.username}</p>
                                <div className="mx-5 my-1">

                                    <button className='bg-blue-500 text-white px-4 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300'
                                        onClick={() => handleSelectStudentCourse(student)}
                                    >
                                        เลือก
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>ไม่มีข้อมูล</p>
                    )}
                </div>
                <div className="w-2/3">
                    {selectedStudentCourse && (
                        <div className="">
                            {selectedStudentCourse.StudentCourse && selectedStudentCourse.StudentCourse.length > 0 ? (
                                <div className="">
                                    <table className='min-w-full rounded-lg  bg-white '>
                                        <thead className='text-white bg-blue-500'>
                                            <tr>
                                                <th className='px-6 py-2 text-left font-semibold'>รหัสวิชา</th>
                                                <th className='px-6 py-2 text-left font-semibold'>ชื่อวิชา</th>
                                                <th className='px-6 py-2 text-center font-semibold'>หน่วยกิต</th>
                                                <th className='px-6 py-2 text-center font-semibold'>สถานะ</th>
                                                <th className='px-6 py-2 '></th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {selectedStudentCourse.StudentCourse.map((Course) => (
                                                <tr className='border-b hover:bg-gray-200' key={Course.id}>
                                                    <td className='px-6 py-2 text-left'>{Course.courseCode}</td>
                                                    <td className='px-6 py-2 text-left'>{Course.courseName}</td>
                                                    <td className='px-6 py-2 text-center'>{Course.credit}</td>
                                                    {Course.courseTransfers && Course.courseTransfers.map((Coursetransfer) => (
                                                        <td key={Coursetransfer.id} className={`px-6 py-2 text-center`}>

                                                            <div className={`inline-block px-2  rounded-full text-white ${Coursetransfer.status === 'PENDING' ? 'bg-orange-500' :
                                                                Coursetransfer.status === 'APPROVED' ? 'bg-green-500' :
                                                                    Coursetransfer.status === 'REJECTED' ? 'bg-red-500' : ''}`}>

                                                                {Coursetransfer.status === 'PENDING' ? 'รอดำเนินการ' :
                                                                    Coursetransfer.status === 'APPROVED' ? 'ได้รับการอนุมัติ' :
                                                                        Coursetransfer.status === 'REJECTED' ? 'ถูกปฏิเสธ' : Coursetransfer.status}
                                                            </div>
                                                        </td>
                                                    ))}
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
                                </div>

                            ) : (
                                <p></p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Managecourse