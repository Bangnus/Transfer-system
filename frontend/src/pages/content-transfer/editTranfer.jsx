import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/connent-navbar/navbar'
import BreadcrumbsCustom from '../../components/content-Breadcrumbs/Breadcrumbs';
import Alert from '../../components/content-Alert/alert';
const EditTranfer = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [courseCode, setCourseCode] = useState('')
    const [courseName, setCourseName] = useState('')
    const [credit, setCredit] = useState('')
    const [grade, setGrade] = useState('')
    const [description, setDescription] = useState('')
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/subject/coursetransfer/${id}`)
                const course = res.data;

                setCourseCode(course.courseCode);
                setCourseName(course.courseName);
                setCredit(course.credit);
                setGrade(course.grade);
                setDescription(course.description);
            } catch (error) {
                console.error('Error detching course data', error)
            }
        }
        fetchData();
    }, [id])

    const handleUpdateInformation = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/subject/coursetransfer/${id}`, {
                courseCode,
                courseName,
                credit,
                grade,
                description,
            });
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);

            setTimeout(() => {
                navigate('/tranfer')
            }, 1000);
        } catch (error) {
            console.error('Error Update information', error);
        }
    }
    const breadcrumbLinks = [
        { label: "Home", to: "/" },
        { label: "Tranfer", to: '/tranfer' },
        { label: "Edit" },
    ];
    return (
        <>
            <Navbar />
            <div className="bg-blue-50 p-2 rounded-md shadow-sm">
                <BreadcrumbsCustom links={breadcrumbLinks} />
            </div>
            <div className='container mx-auto p-5 my-4 bg-white rounded-md shadow-md animate-fade-up animate-once animate-ease-out animate-normal animate-fill-forwards'>
                <h1 className='text-2xl font-bold mb-4 text-gray-700'>เเก้ไขข้อมูล</h1>
                <form className='space-y-4 text-gray-700'>
                    <div>
                        <label className='block font-semibold'><strong>รหัสวิชา:</strong></label>
                        <input
                            type="text"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                            className='w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 '
                        />
                    </div>
                    <div>
                        <label className='block font-semibold'><strong>ชื่อวิชา:</strong></label>
                        <input
                            type="text"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                            className='w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 '
                        />
                    </div>
                    <div>
                        <label className='block font-semibold'><strong>หน่วยกิต:</strong></label>
                        <input
                            type="text"
                            value={credit}
                            onChange={(e) => setCredit(e.target.value)}
                            className='w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 '
                        />
                    </div>
                    <div>
                        <label className='block font-semibold'><strong>เกรด:</strong></label>
                        <input
                            type="text"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className='w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 '
                        />
                    </div>
                    <div>
                        <label className='block font-semibold'><strong>คำอธิบายรายวิชา:</strong></label>
                        <textarea
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 '
                            rows='3'
                        />
                    </div>
                    <div>
                        {showAlert && (
                            <Alert message="ข้อมูลอัปเดตเรียบร้อย!" onClose={() => setShowAlert(false)} />
                        )}

                        <div className="">
                            <button
                                type='button'
                                onClick={handleUpdateInformation}
                                className='w-full bg-blue-500 text-white px-3 py-2 rounded-md font-semibold hover:bg-blue-600 transition duration-300 ease-in-out'>
                                อัดเดตข้อมูล
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTranfer