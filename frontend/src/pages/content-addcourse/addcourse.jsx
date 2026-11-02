import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { addcoursetransfer, coursetransfer } from '../../store/actions/coursetransferActions';
import { fetchCourses, fetchSpecialcourse } from '../../store/actions/courseActions';
import AppLayout from '../../components/layout/AppLayout';
import axios from 'axios';

// Find the chosen university course in the catalogues already in the store
const findGeneral = (categories, id) => {
    for (const category of categories || []) {
        for (const group of category.groups || []) {
            const course = (group.courses || []).find((c) => String(c.id) === String(id));
            if (course) return { course, category: category.name, group: group.name };
        }
    }
    return null;
};

const findSpecial = (categories, id) => {
    for (const category of categories || []) {
        for (const group of category.SpecialGroup || []) {
            for (const sub of group.SubSpecialtyGroup || []) {
                const course = (sub.SpecialCourse || []).find((c) => String(c.id) === String(id));
                if (course) return { course, category: category.name, group: sub.name };
            }
        }
    }
    return null;
};

const Addcourse = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { specialcourseId } = location.state || {};
    const { courseId } = location.state || {};
    const { loading = false } = useSelector((state) => state.addcoursetransfer);
    const user = useSelector((state) => state.user.user);
    const { data: generalCourses = [], specialdata: specialCourses = [], loading: catalogueLoading } = useSelector((state) => state.courses);

    const hasGeneral = courseId !== undefined && courseId !== null;
    const hasSpecial = specialcourseId !== undefined && specialcourseId !== null;
    const hasChoice = hasGeneral || hasSpecial;

    // After a reload the store is empty, so fetch the catalogue the chosen course lives in
    useEffect(() => {
        if (hasGeneral && generalCourses.length === 0) dispatch(fetchCourses());
        if (hasSpecial && specialCourses.length === 0) dispatch(fetchSpecialcourse());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const chosen = hasGeneral ? findGeneral(generalCourses, courseId) : hasSpecial ? findSpecial(specialCourses, specialcourseId) : null;

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
    // UI only: keeps the button disabled through all three requests and shows a failure line
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        if (user && user.username) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                usernameId: user.username
            }));
        }
    }, [user]);

    const [formcourseId, setFormcourseId] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');
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
            setSubmitError('บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
            setSubmitting(false);
        }
    };

    const busy = loading || submitting;

    const breadcrumbLinks = [
        { label: 'หน้าหลัก', to: '/home' },
        { label: 'เทียบโอนรายวิชา', to: '/tranfer' },
        { label: 'เลือกรายวิชา', to: '/course' },
        { label: 'เพิ่มข้อมูลวิชา' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbLinks}>
            <div className="mx-auto max-w-2xl">
                <div className="page-head">
                    <div>
                        <h1 className="page-title">เพิ่มข้อมูลวิชา</h1>
                        <p className="page-sub">กรอกข้อมูลรายวิชาที่คุณสอบผ่านมาแล้ว เพื่อเทียบโอนกับรายวิชาของมหาวิทยาลัย</p>
                    </div>
                </div>

                {hasChoice ? (
                    <section className="card card-pad mb-6" aria-labelledby="chosen-course-label">
                        <div className="flex items-start justify-between gap-3">
                            <p id="chosen-course-label" className="section-label">รายวิชาที่จะเทียบโอน</p>
                            <Link to="/course" className="btn-ghost btn-sm -mr-2 -mt-1.5 min-h-9">เปลี่ยนวิชา</Link>
                        </div>
                        {chosen ? (
                            <div className="mt-2">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <span className="code">{chosen.course.courseCode || '-'}</span>
                                    <span className="badge-navy">{chosen.category}</span>
                                </div>
                                <p className="mt-1.5 text-lg font-semibold text-slate-900">{chosen.course.courseNameTH || '-'}</p>
                                {chosen.course.courseNameENG && <p className="text-sm text-slate-500">{chosen.course.courseNameENG}</p>}
                                <p className="mt-3 text-sm text-slate-600">
                                    <span className="num font-medium text-slate-900">{chosen.course.credit ?? '-'}</span> หน่วยกิต
                                    <span className="mx-2 text-slate-300" aria-hidden="true">|</span>
                                    {chosen.group}
                                </p>
                            </div>
                        ) : catalogueLoading ? (
                            <p className="mt-2 text-sm text-slate-500">กำลังโหลดข้อมูลรายวิชา…</p>
                        ) : (
                            <p className="mt-2 text-sm text-slate-500">ไม่พบข้อมูลรายวิชาที่เลือก</p>
                        )}
                    </section>
                ) : (
                    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-navy-100 bg-navy-50 p-4 sm:flex-row sm:items-center">
                        <InformationCircleIcon className="hidden h-6 w-6 shrink-0 text-navy-700 sm:block" aria-hidden="true" />
                        <p className="flex-1 text-sm text-navy-900">ยังไม่ได้เลือกรายวิชาของมหาวิทยาลัยที่จะเทียบโอน</p>
                        <Link to="/course" className="btn-secondary btn-sm min-h-9 self-start sm:self-auto">ไปเลือกรายวิชา</Link>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="card card-pad">
                    <h2 className="card-title mb-5">รายวิชาที่สอบผ่าน</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
                        <div className="sm:col-span-2">
                            <label htmlFor="courseCode" className="label req">รหัสวิชา</label>
                            <input
                                id="courseCode"
                                type="text"
                                name="courseCode"
                                value={formData.courseCode}
                                onChange={handleChange}
                                className="field"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="courseName" className="label req">ชื่อวิชา</label>
                            <input
                                id="courseName"
                                type="text"
                                name="courseName"
                                value={formData.courseName}
                                onChange={handleChange}
                                className="field"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="credit" className="label req">หน่วยกิต</label>
                            <input
                                id="credit"
                                type="text"
                                inputMode="decimal"
                                name="credit"
                                value={formData.credit}
                                onChange={handleChange}
                                className="field"
                                autoComplete="off"
                                required
                            />
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="grade" className="label req">เกรด</label>
                            <input
                                id="grade"
                                type="text"
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                className="field"
                                autoComplete="off"
                                aria-describedby="grade-hint"
                                required
                            />
                            <p id="grade-hint" className="hint">เช่น A, B+, C</p>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="description" className="label req">คำอธิบายวิชา</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="field"
                                rows="4"
                                required
                            />
                        </div>
                    </div>

                    {submitError && <p className="mt-4 text-sm text-red-600" role="alert">{submitError}</p>}

                    <div className="mt-6 flex flex-col-reverse gap-2 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                        <Link to="/course" className="btn-secondary">ยกเลิก</Link>
                        <button type="submit" disabled={busy} className="btn-primary">
                            {busy ? 'กำลังเพิ่ม...' : 'เพิ่มข้อมูล'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default Addcourse;
