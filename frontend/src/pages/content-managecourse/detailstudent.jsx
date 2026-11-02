import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DocumentMagnifyingGlassIcon, AcademicCapIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';

const show = (v) => {
    const s = typeof v === 'string' ? v.trim() : v;
    return s === null || s === undefined || s === '' ? '-' : s;
};

// Highlighted figures (credits, grade) that staff compare side by side
const Figure = ({ label, value }) => (
    <div className="rounded-lg bg-slate-50 px-4 py-3 ring-1 ring-inset ring-slate-200">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="num mt-0.5 text-2xl font-semibold text-slate-900">{show(value)}</div>
    </div>
);

const Detailstudent = () => {
    const navigate = useNavigate()
    const { courseCode } = useParams()
    const [studentdetail, setStudentdetail] = useState(null)
    const [status, setStatus] = useState('')
    const [description, setDescription] = useState('')
    const [selectedTransferId, setSelectedTransferId] = useState(null)
    // UI-only
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/manage/course/${courseCode}`);
                setStudentdetail(res.data[0])
            } catch (error) {
                console.error('fetch StudentDetail fail', error)
            } finally {
                setLoading(false)
            }
        };

        if (courseCode) {
            fetchStudentDetail();
        }
    }, [courseCode])

    const handleUpdateStatus = async (transferId) => {
        setSaving(true)
        setError('')
        try {
            const res = await axios.put(`http://localhost:5000/api/manage/status/${transferId}`, {
                description,
                status
            });
            setStudentdetail(prev => ({
                ...prev,
                courseTransfers: prev.courseTransfers.map(transfer =>
                    transfer.id === transferId ? { ...transfer, status, description } : transfer
                )
            }));
            navigate('/personnel')

            setStatus('');
            setDescription('');
            setSelectedTransferId(null);

        } catch (error) {
            console.error('Error updating status:', error);
            setError('อัปเดตสถานะไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
        } finally {
            setSaving(false)
        }
    }

    // Start editing a transfer: seed both fields from its current values, so a change to only
    // one field still sends the other one (before, changing only the note sent an empty status)
    const beginEdit = (transfer) => {
        if (selectedTransferId === transfer.id) return;
        setSelectedTransferId(transfer.id);
        setStatus(transfer.status);
        setDescription(transfer.description || '');
        setError('');
    };

    const breadcrumbLinks = [
        { label: "งานเทียบโอน", to: "/personnel" },
        { label: "ตรวจสอบคำร้อง" }
    ];

    const transfers = studentdetail?.courseTransfers || [];

    return (
        <AppLayout breadcrumbs={breadcrumbLinks}>
            <div className="page-head">
                <div className="min-w-0">
                    <h1 className="page-title">ตรวจสอบคำร้องเทียบโอน</h1>
                    <p className="page-sub">
                        {studentdetail
                            ? <>รหัสวิชา <span className="code">{studentdetail.courseCode}</span> · รหัสนักศึกษา <span className="code">{show(studentdetail.usernameId)}</span></>
                            : 'รายละเอียดวิชา'}
                    </p>
                </div>
            </div>

            {loading ? (
                <p className="text-sm text-slate-500">กำลังโหลดข้อมูล…</p>
            ) : !studentdetail ? (
                <div className="card"><EmptyState icon={DocumentMagnifyingGlassIcon} title="ไม่มีข้อมูลรายวิชา" /></div>
            ) : (
                <div className="grid items-start gap-6 lg:grid-cols-2">
                    {/* Student's course */}
                    <section className="card lg:sticky lg:top-24" aria-labelledby="own-course-title">
                        <div className="card-head">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="stat-icon bg-gold-50 text-gold-600"><AcademicCapIcon aria-hidden="true" /></span>
                                <div className="min-w-0">
                                    <p className="section-label">วิชาที่นำมาเทียบ</p>
                                    <h2 id="own-course-title" className="card-title">{show(studentdetail.courseName)}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="card-pad space-y-5">
                            <div className="grid grid-cols-2 gap-3">
                                <Figure label="หน่วยกิต" value={studentdetail.credit} />
                                <Figure label="เกรด" value={studentdetail.grade} />
                            </div>
                            <dl className="dl">
                                <dt>รหัสวิชา</dt><dd className="code">{show(studentdetail.courseCode)}</dd>
                                <dt>ชื่อวิชา</dt><dd>{show(studentdetail.courseName)}</dd>
                                <dt>คำอธิบายรายวิชา</dt><dd className="leading-relaxed">{show(studentdetail.description)}</dd>
                            </dl>
                        </div>
                    </section>

                    {/* University course(s) + decision */}
                    <div className="space-y-6">
                        {transfers.length > 0 ? (
                            transfers.map((CourseTransfer) => {
                                // The target is either a general-education course or a specialised one
                                const target = CourseTransfer.Course ?? CourseTransfer.SpecialCourse;
                                const catalogue = CourseTransfer.Course ? 'หมวดวิชาศึกษาทั่วไป' : CourseTransfer.SpecialCourse ? 'หมวดวิชาเฉพาะ' : null;
                                const editing = selectedTransferId === CourseTransfer.id;
                                const changed = editing && (status !== CourseTransfer.status || description !== (CourseTransfer.description || ''));
                                return (
                                    <section key={CourseTransfer.id} className="card" aria-labelledby={`target-title-${CourseTransfer.id}`}>
                                        <div className="card-head">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <span className="stat-icon bg-navy-50 text-navy-700"><BuildingLibraryIcon aria-hidden="true" /></span>
                                                <div className="min-w-0">
                                                    <p className="section-label">วิชาของมหาวิทยาลัย</p>
                                                    <h2 id={`target-title-${CourseTransfer.id}`} className="card-title">{show(target?.courseNameTH)}</h2>
                                                </div>
                                            </div>
                                            {catalogue && <span className="badge-navy">{catalogue}</span>}
                                        </div>
                                        <div className="card-pad space-y-5">
                                            <div className="grid grid-cols-2 gap-3">
                                                <Figure label="หน่วยกิต" value={target?.credit} />
                                                <div className="rounded-lg px-4 py-3 ring-1 ring-inset ring-slate-200">
                                                    <div className="text-xs text-slate-500">สถานะปัจจุบัน</div>
                                                    <div className="mt-1.5"><StatusBadge status={CourseTransfer.status} /></div>
                                                </div>
                                            </div>
                                            <dl className="dl">
                                                <dt>รหัสวิชา</dt><dd className="code">{show(target?.courseCode)}</dd>
                                                <dt>ชื่อวิชา (TH)</dt><dd>{show(target?.courseNameTH)}</dd>
                                                <dt>ชื่อวิชา (ENG)</dt><dd>{show(target?.courseNameENG)}</dd>
                                                <dt>คำอธิบาย (TH)</dt><dd className="leading-relaxed">{show(target?.descriptionTH)}</dd>
                                                <dt>คำอธิบาย (ENG)</dt><dd className="leading-relaxed">{show(target?.descriptionENG)}</dd>
                                                <dt>คำอธิบายปัจจุบัน</dt><dd className="text-slate-600">{CourseTransfer?.description || 'ไม่มีคำอธิบาย'}</dd>
                                            </dl>
                                        </div>

                                        <form
                                            className="space-y-4 border-t border-slate-100 bg-slate-50/60 px-5 py-5 sm:px-6"
                                            onSubmit={(e) => { e.preventDefault(); handleUpdateStatus(CourseTransfer.id); }}
                                        >
                                            <h3 className="section-label">ผลการพิจารณา</h3>
                                            <div>
                                                <label htmlFor={`status-select-${CourseTransfer.id}`} className="label">สถานะการโอนย้าย</label>
                                                <select
                                                    id={`status-select-${CourseTransfer.id}`}
                                                    className="field"
                                                    value={editing ? status : CourseTransfer.status}
                                                    onChange={(e) => {
                                                        beginEdit(CourseTransfer);
                                                        setStatus(e.target.value);
                                                    }}
                                                >
                                                    <option value="PENDING">รอดำเนินการ</option>
                                                    <option value="APPROVED">ได้รับการอนุมัติ</option>
                                                    <option value="REJECTED">ถูกปฏิเสธ</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label htmlFor={`description-${CourseTransfer.id}`} className="label">คำอธิบาย</label>
                                                <textarea
                                                    id={`description-${CourseTransfer.id}`}
                                                    className="field"
                                                    value={editing ? description : CourseTransfer.description || ''}
                                                    onChange={(e) => {
                                                        beginEdit(CourseTransfer);
                                                        setDescription(e.target.value);
                                                    }}
                                                    rows="3"
                                                    placeholder="เหตุผลประกอบการพิจารณา"
                                                />
                                            </div>
                                            {error && editing && <p className="text-sm text-red-600" role="alert">{error}</p>}
                                            <div className="flex justify-end">
                                                <button type="submit" className="btn-primary w-full sm:w-auto" disabled={!changed || saving}>
                                                    {saving && editing ? 'กำลังบันทึก…' : 'อัปเดตสถานะ'}
                                                </button>
                                            </div>
                                        </form>
                                    </section>
                                );
                            })
                        ) : (
                            <div className="card"><EmptyState title="ไม่มีข้อมูลการโอนย้ายรายวิชา" /></div>
                        )}
                    </div>
                </div>
            )}
        </AppLayout>
    )
}

export default Detailstudent
