import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addcoursetransfer, coursetransfer } from '../../store/actions/coursetransferActions';
import Navbar from '../../components/connent-navbar/navbar';
import axios from 'axios';
import BreadcrumbsCustom from '../../components/content-Breadcrumbs/Breadcrumbs';

const Addcourse = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { specialcourseId } = location.state || {};
    const { courseId } = location.state || {};
    const { loading = false, error } = useSelector((state) => state.addcoursetransfer);
    const user = useSelector((state) => state.user.user);

    const [formCourseTransfer, setFormCourseTransfer] = useState({
        originalCourseId: null,
        transferredCourseId: null,
        specialtransferredCourseId: null
    });
    const [formData, setFormData] = useState({
        courseCode: '',
        courseName: '',
        credit: '',
        grade: '',
        description: '',
        usernameId: user ? user.username : '',
    });

    useEffect(() => {
        if (user && user.username) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                usernameId: user.username
            }));
        }
    }, [user]);

    const [formcourseId, setFormcourseId] = useState(null);
    console.log(formcourseId);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCourseId = await dispatch(addcoursetransfer(formData));
            setFormcourseId(newCourseId);

            const updatedFormCourseTransfer = {
                originalCourseId: newCourseId,
                transferredCourseId: courseId,
                specialtransferredCourseId: specialcourseId,
            };

            setFormCourseTransfer(updatedFormCourseTransfer);

            await dispatch(coursetransfer(updatedFormCourseTransfer));

            await axios.post('http://localhost:5000/api/notify/notification', {
                username: user.username,
                message: `ได้เพิ่มข้อมูลใหม่`,
                StdCourseId: newCourseId,
            });

            navigate('/tranfer');

            setFormCourseTransfer({
                originalCourseId: null,
                transferredCourseId: null,
                specialtransferredCourseId: null
            });

            setFormData({
                courseCode: '',
                courseName: '',
                credit: '',
                grade: '',
                description: '',
                usernameId: user.username || '',
            });
        } catch (error) {
            console.error('Error adding course', error);
        }
    };
    const breadcrumbLinks = [
        { label: "Home", to: "/" },
        { label: "Tranfer", to: '/tranfer' },
        { label: "Course", to: '/course' },
        { label: "AddCourse" },
    ];
    return (
        <>
            <Navbar />
            <div className="bg-blue-50 p-2 rounded-md shadow-sm">
                <BreadcrumbsCustom links={breadcrumbLinks} />
            </div>
            <div className="  flex flex-col items-center my-4 animate-flip-up animate-once animate-ease-in-out animate-normal animate-fill-forwards">
                <div className="bg-white w-full max-w-md p-5  shadow-md rounded-md">
                    <h2 className="text-2xl font-semibold  text-gray-700 mb-6">เพิ่มข้อมูลวิชา</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">รหัสวิชา</label>
                            <input
                                type="text"
                                name="courseCode"
                                value={formData.courseCode}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">ชื่อวิชา</label>
                            <input
                                type="text"
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">หน่วยกิต</label>
                            <input
                                type="text"
                                name="credit"
                                value={formData.credit}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">เกรด</label>
                            <input
                                type="text"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">คำอธิบายวิชา</label>
                            <textarea
                                type="text"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                rows="3"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-2 mt-4 text-white font-semibold rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} transition duration-200`}
                        >
                            {loading ? 'กำลังเพิ่ม...' : 'เพิ่มข้อมูล'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Addcourse;
