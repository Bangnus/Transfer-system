import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Detailstudent = () => {
    const { firstname } = useParams()
    const [studentdetail, setStudentdetail] = useState(null)
    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                console.log(firstname)
                const res = await axios.get(`http://localhost:5000/api/manage/student/${firstname}`);
                setStudentdetail(res.data[0])
            } catch (error) {
                console.error('fetch StudentDetail fail', error)
            }
        };

        if (firstname) {
            fetchStudentDetail();
        }
    }, [firstname])
    console.log(studentdetail)
    return (
        <div className="">
            {studentdetail ? (
               <div className="">
                {studentdetail.StudentCourse && studentdetail.StudentCourse.length > 0 ? (
                   <div className="">
                        <div className="">
                            <table>
                                <thead>
                                    <tr>
                                        <th>รหัสวิชา</th>
                                        <th>ชื่อวิชา</th>
                                        <th>หน่วยกิต</th>
                                        <th>เกรด</th>
                                        <th>คำอธิบายวิชา</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                   </div>
                ) : (
                    <p>กำลังโลหดข้อมูล</p>
                )}
               </div>
            ) : (
                <p>กำลังโลหดข้อมูล</p>
            )}
        </div>
    )
}

export default Detailstudent