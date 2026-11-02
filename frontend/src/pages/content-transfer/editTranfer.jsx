import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppLayout from '../../components/layout/AppLayout';
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
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/subject/coursetransfer/${id}`)
                const course = res.data;

                // `?? ''` keeps the inputs controlled when a column is empty
                setCourseCode(course?.courseCode ?? '');
                setCourseName(course?.courseName ?? '');
                setCredit(course?.credit ?? '');
                setGrade(course?.grade ?? '');
                setDescription(course?.description ?? '');
            } catch (error) {
                console.error('Error fetching course data', error)
                setError('โหลดข้อมูลรายวิชาไม่สำเร็จ')
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [id])

    const handleUpdateInformation = async (event) => {
        event?.preventDefault();
        setSaving(true);
        setError('');
        try {
            await axios.put(`http://localhost:5000/api/subject/coursetransfer/${id}`, {
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
            setError('บันทึกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
            setSaving(false);
        }
    }

    const breadcrumbLinks = [
        { label: 'หน้าหลัก', to: '/home' },
        { label: 'เทียบโอนรายวิชา', to: '/tranfer' },
        { label: 'แก้ไขข้อมูลรายวิชา' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbLinks}>
            {showAlert && (
                <Alert message="ข้อมูลอัปเดตเรียบร้อย!" onClose={() => setShowAlert(false)} />
            )}

            <div className="page-head">
                <div>
                    <h1 className="page-title">แก้ไขข้อมูลรายวิชา</h1>
                    <p className="page-sub">ข้อมูลของรายวิชาที่คุณนำมาขอเทียบโอน</p>
                </div>
            </div>

            <div className="card max-w-2xl">
                {loading ? (
                    <p className="card-pad text-sm text-slate-500">กำลังโหลดข้อมูล...</p>
                ) : (
                    <form onSubmit={handleUpdateInformation}>
                        <div className="card-pad grid gap-5 sm:grid-cols-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="courseCode" className="label">รหัสวิชา</label>
                                <input
                                    id="courseCode"
                                    type="text"
                                    value={courseCode}
                                    onChange={(e) => setCourseCode(e.target.value)}
                                    className="field font-mono"
                                />
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="courseName" className="label">ชื่อวิชา</label>
                                <input
                                    id="courseName"
                                    type="text"
                                    value={courseName}
                                    onChange={(e) => setCourseName(e.target.value)}
                                    className="field"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="credit" className="label">หน่วยกิต</label>
                                <input
                                    id="credit"
                                    type="text"
                                    inputMode="numeric"
                                    value={credit}
                                    onChange={(e) => setCredit(e.target.value)}
                                    className="field num"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="grade" className="label">เกรด</label>
                                <input
                                    id="grade"
                                    type="text"
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value)}
                                    className="field"
                                />
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="description" className="label">คำอธิบายรายวิชา</label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="field"
                                    rows={5}
                                />
                            </div>
                            {error && <p role="alert" className="text-sm font-medium text-red-600 sm:col-span-6">{error}</p>}
                        </div>
                        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                            <Link to="/tranfer" className="btn-secondary">ยกเลิก</Link>
                            <button type="submit" disabled={saving} className="btn-primary">
                                {saving ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </AppLayout>
    )
}

export default EditTranfer
