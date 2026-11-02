import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronRightIcon, CursorArrowRaysIcon, UsersIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';

// Number of PENDING transfer requests across a student's courses
const pendingOf = (student) => (student.StudentCourse || [])
    .reduce((n, c) => n + (c.courseTransfers || []).filter((t) => t.status === 'PENDING').length, 0);

const Statuses = ({ transfers }) => (
    transfers && transfers.length > 0 ? (
        <div className="flex flex-wrap gap-1.5">
            {transfers.map((Coursetransfer) => <StatusBadge key={Coursetransfer.id} status={Coursetransfer.status} />)}
        </div>
    ) : <span className="text-slate-400">-</span>
);

const Managecourse = () => {
    const [selectedStudentCourse, setSelectedStudentCourse] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true); // UI-only
    const detailRef = useRef(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/manage/students');
                setStudents(res.data);
            } catch (error) {
                console.error('Error fetching Students', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStudent();
        const interval = setInterval(fetchStudent, 10000);
        return () => clearInterval(interval);
    }, []);

    // Compare by id: the list is re-fetched every 10 s, so object identity changes
    const handleSelectStudentCourse = (student) => {
        const isSame = selectedStudentCourse && student.id === selectedStudentCourse.id;
        setSelectedStudentCourse(isSame ? null : student);
        if (!isSame && window.matchMedia('(max-width: 1023px)').matches) {
            setTimeout(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        }
    };

    // Show the freshest copy of the selected student after each poll
    const selected = selectedStudentCourse
        ? students.find((s) => s.id === selectedStudentCourse.id) || selectedStudentCourse
        : null;
    const courses = selected?.StudentCourse || [];

    return (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
            {/* Student list */}
            <section className="card lg:sticky lg:top-24" aria-labelledby="students-title">
                <div className="card-head">
                    <h2 id="students-title" className="card-title">นักศึกษา</h2>
                    {students.length > 0 && <span className="text-xs text-slate-500"><span className="num">{students.length}</span> คน</span>}
                </div>
                {loading ? (
                    <p className="px-5 py-6 text-sm text-slate-500">กำลังโหลดข้อมูล…</p>
                ) : students && students.length > 0 ? (
                    <ul className="divide-y divide-slate-100 lg:max-h-[calc(100vh-14rem)] lg:overflow-y-auto">
                        {students.map((student) => {
                            const isSelected = selected?.id === student.id;
                            const pending = pendingOf(student);
                            return (
                                <li key={student.id}>
                                    <button
                                        type="button"
                                        aria-pressed={isSelected}
                                        onClick={() => handleSelectStudentCourse(student)}
                                        className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${isSelected ? 'bg-navy-50' : 'hover:bg-slate-50'}`}
                                    >
                                        <span className="min-w-0 flex-1">
                                            <span className={`block truncate text-sm font-medium ${isSelected ? 'text-navy-900' : 'text-slate-900'}`}>{student.name || '-'}</span>
                                            <span className="code mt-0.5 block text-xs text-slate-500">{student.username}</span>
                                        </span>
                                        {pending > 0 && (
                                            <span className="badge-pending" title={`รอดำเนินการ ${pending} คำร้อง`}>
                                                รอ <span className="num">{pending}</span>
                                            </span>
                                        )}
                                        <ChevronRightIcon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-navy-700' : 'text-slate-300'}`} aria-hidden="true" />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <EmptyState icon={UsersIcon} title="ไม่มีข้อมูล" />
                )}
            </section>

            {/* Selected student's courses */}
            <section ref={detailRef} className="card scroll-mt-20" aria-live="polite">
                {!selected ? (
                    <EmptyState icon={CursorArrowRaysIcon} title="เลือกนักศึกษาเพื่อดูรายวิชาที่ขอเทียบโอน" />
                ) : (
                    <>
                        <div className="card-head">
                            <div className="min-w-0">
                                <h2 className="card-title truncate">{selected.name} - วิชาที่เทียบโอน</h2>
                                <p className="mt-0.5 text-xs text-slate-500">รหัสนักศึกษา <span className="code text-xs">{selected.username}</span></p>
                            </div>
                            {courses.length > 0 && <span className="badge-neutral"><span className="num">{courses.length}</span> วิชา</span>}
                        </div>
                        {courses.length > 0 ? (
                            <>
                                {/* md+: table */}
                                <div className="table-wrap hidden md:block">
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>รหัสวิชา</th>
                                                <th>ชื่อวิชา</th>
                                                <th className="text-center">หน่วยกิต</th>
                                                <th>สถานะ</th>
                                                <th><span className="sr-only">การดำเนินการ</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courses.map((Course) => (
                                                <tr key={Course.id}>
                                                    <td className="code">{Course.courseCode || '-'}</td>
                                                    <td className="text-slate-900">{Course.courseName || '-'}</td>
                                                    <td className="num text-center">{Course.credit || '-'}</td>
                                                    <td><Statuses transfers={Course.courseTransfers} /></td>
                                                    <td className="text-right">
                                                        <Link to={`/detail/${Course.courseCode}`} className="btn-secondary btn-sm">
                                                            <DocumentMagnifyingGlassIcon aria-hidden="true" />ตรวจสอบ
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* phones: cards */}
                                <ul className="divide-y divide-slate-100 md:hidden">
                                    {courses.map((Course) => (
                                        <li key={Course.id} className="px-5 py-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="min-w-0">
                                                    <p className="code">{Course.courseCode || '-'}</p>
                                                    <p className="mt-0.5 text-sm font-medium text-slate-900">{Course.courseName || '-'}</p>
                                                    <p className="mt-0.5 text-xs text-slate-500">หน่วยกิต <span className="num">{Course.credit || '-'}</span></p>
                                                </div>
                                                <Statuses transfers={Course.courseTransfers} />
                                            </div>
                                            <Link to={`/detail/${Course.courseCode}`} className="btn-secondary btn-sm mt-3 w-full">
                                                <DocumentMagnifyingGlassIcon aria-hidden="true" />ตรวจสอบ
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <EmptyState title="ไม่มีข้อมูล" />
                        )}
                    </>
                )}
            </section>
        </div>
    );
};

export default Managecourse;
