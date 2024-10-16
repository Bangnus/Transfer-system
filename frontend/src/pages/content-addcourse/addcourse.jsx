import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addcoursetransfer, coursetransfer } from '../../store/actions/coursetransferActions';
import Navbar from '../../components/connent-navbar/navbar'
import axios from 'axios';
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
    })
    const [formData, setFormData] = useState({
        courseCode: '',
        courseName: '',
        credit: '',
        grade: '',
        description: '',
        usernameId: '',
    });

    useEffect(() => {
        if (user && user.username) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                usernameId: user.username
            }))
        }
    }, [user])
    const [formcourseId, setFormcourseId] = useState(null)
    console.log(formcourseId)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

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
                message: `ได้เพิ่มข้อมูลใหม่`
            })
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
                usernameId: null
            });

        } catch (error) {
            console.error('Error adding course', error);
        }
    }

    return (
        <div className="">
            <Navbar />
            {user?.username}
            <div>{courseId}</div>
            <div >{specialcourseId}</div>

            <form onSubmit={handleSubmit}>
                <div className="">
                    <label className='' >รหัสวิชา</label>
                    <input
                        type="text"
                        name='courseCode'
                        value={formData.courseCode}
                        onChange={handleChange}
                        className='border border-blue-500'
                        required
                    />
                </div>

                <div className="">
                    <label className='' >ชื่อวิชา</label>
                    <input
                        type="text"
                        name='courseName'
                        value={formData.courseName}
                        onChange={handleChange}
                        className='border border-blue-500'
                        required
                    />
                </div>

                <div className="">
                    <label htmlFor="">หน่วยกิต</label>
                    <input
                        type="text"
                        name='credit'
                        value={formData.credit}
                        onChange={handleChange}
                        className=''
                        required
                    />
                </div>

                <div className="">
                    <label htmlFor="">เกรด</label>
                    <input
                        type="text"
                        name='grade'
                        value={formData.grade}
                        onChange={handleChange}
                        className=''
                        required
                    />
                </div>

                <div className="">
                    <label htmlFor="">คำอธิบายวิชา</label>
                    <textarea
                        type="text"
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        className=''
                        rows='3'
                        required
                    />
                </div>


                <button type='submit' disabled={loading}>
                    {loading ? 'กำลังเพิ่ม...' : 'เพิ่มข้อมูล'}
                </button>
            </form>
        </div>
    )
}

export default Addcourse