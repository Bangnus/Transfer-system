import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Modal from '../../components/ui/Modal';

// Pieces shared by the general and special course catalogues on /course

const show = (value) => (value === null || value === undefined || value === '' ? '-' : value);

// Accordion header row: number, name, course count, chevron
export const AccordionButton = ({ expanded, onClick, controls, number, name, count, level = 1 }) => (
    <button
        type="button"
        onClick={onClick}
        aria-expanded={expanded}
        aria-controls={controls}
        className={`flex w-full items-center gap-3 text-left transition-colors hover:bg-slate-50 ${
            level === 1 ? 'min-h-[52px] px-4 py-3 sm:px-5' : 'min-h-[44px] py-2.5 pl-6 pr-4 sm:pl-8 sm:pr-5'
        } ${expanded ? 'bg-slate-50' : ''}`}
    >
        <span
            className={`num flex shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                level === 1 ? 'h-7 min-w-[1.75rem] bg-navy-900 px-1.5 text-white' : 'h-6 min-w-[2rem] bg-navy-50 px-1.5 text-navy-700'
            }`}
        >
            {number}
        </span>
        <span className={`min-w-0 flex-1 ${level === 1 ? 'font-medium text-slate-900' : 'text-sm text-slate-700'}`}>{name}</span>
        <span className="badge-neutral shrink-0"><span className="num">{count}</span> วิชา</span>
        <ChevronDownIcon
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
    </button>
);

// Course rows inside an open group. Stacked on phones, one line from sm up.
export const CourseRows = ({ courses, stateKey, onDetail, indent = false }) => {
    if (!courses || courses.length === 0) {
        return <p className={`py-4 text-sm text-slate-500 ${indent ? 'pl-8 pr-4 sm:pl-10' : 'px-4 sm:px-5'}`}>ไม่มีวิชาในกลุ่มนี้</p>;
    }
    return (
        <ul className="divide-y divide-slate-100">
            {courses.map((course) => (
                <li
                    key={course.id}
                    className={`flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:gap-4 ${indent ? 'pl-8 pr-4 sm:pl-10 sm:pr-5' : 'px-4 sm:px-5'}`}
                >
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                            <span className="code">{show(course.courseCode)}</span>
                            <span className="text-xs text-slate-500"><span className="num">{show(course.credit)}</span> หน่วยกิต</span>
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-slate-900">{show(course.courseNameTH)}</p>
                        {course.courseNameENG && <p className="truncate text-xs text-slate-500">{course.courseNameENG}</p>}
                    </div>
                    <div className="flex shrink-0 gap-2">
                        <button type="button" onClick={() => onDetail(course)} className="btn-secondary btn-sm min-h-9 flex-1 sm:flex-none">
                            รายละเอียด
                        </button>
                        <Link to="/addcourse" state={{ [stateKey]: course.id }} className="btn-primary btn-sm min-h-9 flex-1 sm:flex-none">
                            เลือก
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    );
};

// Course detail dialog with a "pick this course" link in the footer (Modal portals itself to <body>)
export const CourseDetailModal = ({ course, stateKey, onClose }) => (
    <Modal
        open={!!course}
        onClose={onClose}
        title="รายละเอียดวิชา"
        size="sm:max-w-2xl"
        footer={course && (
            <>
                <button type="button" onClick={onClose} className="btn-secondary">ปิด</button>
                <Link to="/addcourse" state={{ [stateKey]: course.id }} className="btn-primary">เลือกวิชานี้</Link>
            </>
        )}
    >
        {course && (
            <dl className="dl">
                <dt>รหัสวิชา</dt>
                <dd><span className="code">{show(course.courseCode)}</span></dd>
                <dt>ชื่อวิชา (TH)</dt>
                <dd className="font-medium">{show(course.courseNameTH)}</dd>
                <dt>ชื่อวิชา (EN)</dt>
                <dd>{show(course.courseNameENG)}</dd>
                <dt>วิชาบังคับก่อน</dt>
                <dd>{show(course.prerequisiteTH)}</dd>
                <dt>Prerequisite</dt>
                <dd>{show(course.prerequisiteENG)}</dd>
                <dt>หน่วยกิต</dt>
                <dd className="num">{show(course.credit)}</dd>
                <dt>คำอธิบายรายวิชา (TH)</dt>
                <dd className="whitespace-pre-line leading-relaxed">{show(course.descriptionTH?.trim())}</dd>
                <dt>คำอธิบายรายวิชา (EN)</dt>
                <dd className="whitespace-pre-line leading-relaxed">{show(course.descriptionENG?.trim())}</dd>
            </dl>
        )}
    </Modal>
);

// Skeleton rows while a catalogue loads
export const CatalogueSkeleton = () => (
    <div className="divide-y divide-slate-100" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-4 sm:px-5">
                <span className="h-7 w-7 animate-pulse rounded-md bg-slate-100" />
                <span className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
                <span className="h-5 w-12 animate-pulse rounded-full bg-slate-100" />
            </div>
        ))}
    </div>
);

export const errorText = (error) => (typeof error === 'string' ? error : error?.message || error?.error || 'โหลดข้อมูลไม่สำเร็จ');
