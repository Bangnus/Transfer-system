import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline';
import AppLayout from '../../components/layout/AppLayout';
import StatusBadge from '../../components/ui/StatusBadge';
import EmptyState from '../../components/ui/EmptyState';
import ConfirmDeleteModal from '../../components/content-Alert/ConfirmDeleteModal';

const dash = (v) => (v === null || v === undefined || v === '' ? '-' : v);

// The university course a request is matched to (general-education or specialised)
const target = (t) => t?.Course || t?.SpecialCourse || null;
const targetGroup = (t) => t?.Course?.group?.name || t?.SpecialCourse?.SubSpecialtyGroup?.name;

const formatDate = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '-' : d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
};

const STAT_TILES = [
  { key: 'ALL', label: 'คำขอทั้งหมด', icon: ClipboardDocumentListIcon, tone: 'bg-navy-50 text-navy-700' },
  { key: 'PENDING', label: 'รอดำเนินการ', icon: ClockIcon, tone: 'bg-gold-50 text-gold-700' },
  { key: 'APPROVED', label: 'ได้รับการอนุมัติ', icon: CheckCircleIcon, tone: 'bg-emerald-50 text-emerald-700' },
  { key: 'REJECTED', label: 'ถูกปฏิเสธ', icon: XCircleIcon, tone: 'bg-red-50 text-red-700' },
];

// Expanded detail: the university course next to the student's own course, plus the staff note
const TransferDetail = ({ transfer }) => {
  const course = target(transfer);
  const student = transfer?.student;
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-2">
        <section className="card card-pad">
          <h3 className="section-label mb-4">วิชาของมหาวิทยาลัย</h3>
          <dl className="dl">
            <dt>รหัสวิชา</dt><dd className="code">{dash(course?.courseCode)}</dd>
            <dt>ชื่อวิชา</dt><dd>{dash(course?.courseNameTH)}</dd>
            <dt>กลุ่มวิชา</dt><dd>{dash(targetGroup(transfer))}</dd>
            <dt>หน่วยกิต</dt><dd className="num">{dash(course?.credit)}</dd>
            <dt>วิชาบังคับก่อน</dt><dd>{dash(course?.prerequisiteTH)}</dd>
            <dt>คำอธิบายรายวิชา</dt><dd className="leading-relaxed">{dash(course?.descriptionTH)}</dd>
          </dl>
        </section>
        <section className="card card-pad">
          <h3 className="section-label mb-4">วิชาที่นำมาเทียบ</h3>
          <dl className="dl">
            <dt>รหัสวิชา</dt><dd className="code">{dash(student?.courseCode)}</dd>
            <dt>ชื่อวิชา</dt><dd>{dash(student?.courseName)}</dd>
            <dt>หน่วยกิต</dt><dd className="num">{dash(student?.credit)}</dd>
            <dt>เกรด</dt><dd className="font-medium">{dash(student?.grade)}</dd>
            <dt>คำอธิบายรายวิชา</dt><dd className="leading-relaxed">{dash(student?.description)}</dd>
          </dl>
        </section>
      </div>
      <section className="card card-pad">
        <dl className="dl">
          <dt>สถานะ</dt><dd><StatusBadge status={transfer.status} /></dd>
          <dt>วันที่ยื่นคำขอ</dt><dd>{formatDate(transfer.dateSubmitted)}</dd>
          <dt>หมายเหตุจากเจ้าหน้าที่</dt><dd className="leading-relaxed">{dash(transfer.description)}</dd>
        </dl>
      </section>
    </div>
  );
};

const RowActions = ({ transfer, onDelete }) => (
  <div className="flex flex-wrap gap-2">
    <Link to={`/edit/${transfer?.student?.id}`} className="btn-secondary btn-sm">
      <PencilSquareIcon aria-hidden="true" />แก้ไขข้อมูล
    </Link>
    <button
      type="button"
      onClick={() => onDelete(transfer.id)}
      className="btn-secondary btn-sm text-red-700 hover:border-red-300 hover:bg-red-50"
    >
      <TrashIcon aria-hidden="true" />ลบข้อมูล
    </button>
  </div>
);

const Transfer = () => {
  const navigate = useNavigate();
  const [selectedDetail, setSelectedDetail] = useState(null);
  const user = useSelector((state) => state.user.user);
  const username = user?.username;
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transferId, setTransferId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Compare by id so an open row stays open after the 60s refresh replaces the objects
  const isOpen = (transfer) => selectedDetail?.id === transfer.id;
  const openDetail = (transfer) => {
    setSelectedDetail(isOpen(transfer) ? null : transfer); // เปิด/ปิดข้อมูล
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/subject/coursetransfer', {
          params: { username },
        });
        setData(res.data);
        setError('');
      } catch (error) {
        console.error('Error fetching data', error);
        setError('โหลดข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
      const interval = setInterval(fetchData, 60000);
      return () => clearInterval(interval);
    }
    setLoading(false);
    return undefined;
  }, [username]);

  const handleDeleteClick = (id) => {
    setTransferId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/subject/deletecoursetransfer/${transferId}`);
      setData((prevData) => prevData.filter((course) => course.id !== transferId));
      setIsModalOpen(false);
      navigate('/tranfer');
    } catch (error) {
      console.error('Error deleting data', error);
      setIsModalOpen(false);
      setError('ลบข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    }
  };

  const breadcrumbLinks = [
    { label: 'หน้าหลัก', to: '/home' },
    { label: 'เทียบโอนรายวิชา' },
  ];

  const list = Array.isArray(data) ? data : [];
  const counts = list.reduce(
    (acc, t) => ({ ...acc, [t.status]: (acc[t.status] || 0) + 1 }),
    { ALL: list.length }
  );

  return (
    <AppLayout breadcrumbs={breadcrumbLinks}>
      <div className="page-head">
        <div>
          <h1 className="page-title">การเทียบโอนรายวิชา</h1>
          <p className="page-sub">รายวิชาที่คุณยื่นขอเทียบโอนและผลการพิจารณาจากเจ้าหน้าที่</p>
        </div>
        <Link to="/course" className="btn-primary self-start sm:self-auto">
          <PlusIcon aria-hidden="true" />เพิ่มวิชาเทียบโอน
        </Link>
      </div>

      {list.length > 0 && (
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {STAT_TILES.map(({ key, label, icon: Icon, tone }) => (
            <div key={key} className="stat">
              <div>
                <p className="stat-label">{label}</p>
                <p className="stat-value">{counts[key] || 0}</p>
              </div>
              <span className={`stat-icon hidden lg:flex ${tone}`}><Icon aria-hidden="true" /></span>
            </div>
          ))}
        </div>
      )}

      {error && <p role="alert" className="mb-4 text-sm font-medium text-red-600">{error}</p>}

      {loading ? (
        <div className="card"><p className="px-6 py-12 text-center text-sm text-slate-500">กำลังโหลดข้อมูล...</p></div>
      ) : list.length === 0 ? (
        <div className="card">
          <EmptyState icon={ArrowsRightLeftIcon} title="ยังไม่มีรายวิชาที่ยื่นขอเทียบโอน">
            <Link to="/course" className="btn-primary mt-3"><PlusIcon aria-hidden="true" />เพิ่มวิชาเทียบโอน</Link>
          </EmptyState>
        </div>
      ) : (
        <>
          {/* Desktop / tablet: table */}
          <div className="card hidden overflow-hidden md:block">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th scope="col">รหัสวิชา</th>
                    <th scope="col">ชื่อวิชา</th>
                    <th scope="col" className="text-center">หน่วยกิต</th>
                    <th scope="col">สถานะ</th>
                    <th scope="col"><span className="sr-only">รายละเอียด</span></th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((transfer) => {
                    const course = target(transfer);
                    const open = isOpen(transfer);
                    return (
                      <React.Fragment key={transfer.id}>
                        <tr className={open ? 'bg-slate-50' : ''}>
                          <td className="code">{dash(course?.courseCode)}</td>
                          <td>
                            <div className="font-medium text-slate-900">{dash(course?.courseNameTH)}</div>
                            <div className="mt-0.5 text-xs text-slate-500">
                              เทียบจาก <span className="font-mono">{dash(transfer?.student?.courseCode)}</span> {transfer?.student?.courseName}
                            </div>
                          </td>
                          <td className="num text-center">{dash(course?.credit)}</td>
                          <td><StatusBadge status={transfer.status} /></td>
                          <td className="text-right">
                            <button
                              type="button"
                              onClick={() => openDetail(transfer)}
                              aria-expanded={open}
                              aria-controls={`detail-${transfer.id}`}
                              className="btn-ghost btn-sm"
                            >
                              รายละเอียด
                              <ChevronDownIcon aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                            </button>
                          </td>
                        </tr>
                        {open && (
                          <tr id={`detail-${transfer.id}`}>
                            <td colSpan={5} className="bg-slate-50 !px-4 !py-5 lg:!px-6">
                              <TransferDetail transfer={transfer} />
                              <div className="mt-4">
                                <RowActions transfer={transfer} onDelete={handleDeleteClick} />
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Phones: card list */}
          <ul className="space-y-3 md:hidden">
            {list.map((transfer) => {
              const course = target(transfer);
              const open = isOpen(transfer);
              return (
                <li key={transfer.id} className="card">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <span className="code pt-0.5">{dash(course?.courseCode)}</span>
                      <StatusBadge status={transfer.status} />
                    </div>
                    <p className="mt-1.5 font-medium text-slate-900">{dash(course?.courseNameTH)}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      เทียบจาก <span className="font-mono">{dash(transfer?.student?.courseCode)}</span> {transfer?.student?.courseName}
                    </p>
                    <p className="mt-2 text-sm text-slate-600">หน่วยกิต <span className="num font-medium text-slate-800">{dash(course?.credit)}</span></p>

                    <div className="mt-3 flex items-center gap-1 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => openDetail(transfer)}
                        aria-expanded={open}
                        aria-controls={`m-detail-${transfer.id}`}
                        className="btn-ghost btn-sm -ml-3 mr-auto"
                      >
                        {open ? 'ซ่อนรายละเอียด' : 'รายละเอียด'}
                        <ChevronDownIcon aria-hidden="true" className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                      </button>
                      <Link to={`/edit/${transfer?.student?.id}`} className="icon-btn" aria-label="แก้ไขข้อมูล" title="แก้ไขข้อมูล">
                        <PencilSquareIcon aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(transfer.id)}
                        className="icon-btn hover:bg-red-50 hover:text-red-700"
                        aria-label="ลบข้อมูล"
                        title="ลบข้อมูล"
                      >
                        <TrashIcon aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  {open && (
                    <div id={`m-detail-${transfer.id}`} className="rounded-b-xl border-t border-slate-100 bg-slate-50 p-3">
                      <TransferDetail transfer={transfer} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* แสดง Modal ยืนยันการลบ */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </AppLayout>
  );
};

export default Transfer;
