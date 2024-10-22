import React, { useEffect, useState } from 'react'
import Button from '../../components/content-button/button'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Managecourse = () => {

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
    }, [])
    console.log(students)
    return (
        <>
            <div className="">
                <Link to="/addspecialgroup">
                    <Button label='เพิ่มกลุ่มวิชา' />
                </Link>
            </div>
            {students && students.length > 0 ? (
                students.map((student, index) => (
                    <div className="flex items-center" key={student.id}>
                        <p> {index + 1}.{student.name}</p>
                        <div className="mx-5 my-1">
                            <Link to={`/detail/${student.firstname}`}>
                                <button className='bg-blue-500 text-white px-4 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300'>
                                    เลือก
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <p>ไม่มีข้อมูล</p>
            )}
        </>
    )
}

export default Managecourse