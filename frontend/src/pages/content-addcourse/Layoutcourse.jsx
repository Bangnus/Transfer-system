import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Generalcourse from './connent-generalcourse/generalcourse';
import Specialcourse from './content-specialcourse/specialcourse';

const TABS = [
  { key: 'general', label: 'หมวดวิชาศึกษาทั่วไป' },
  { key: 'special', label: 'หมวดวิชาเฉพาะ' },
];

const AddCourse = () => {
  // Phones and tablets show one category at a time; from lg up both columns show
  const [tab, setTab] = useState('general');

  const breadcrumbLinks = [
    { label: 'หน้าหลัก', to: '/home' },
    { label: 'เทียบโอนรายวิชา', to: '/tranfer' },
    { label: 'เลือกรายวิชา' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbLinks}>
      <div className="page-head">
        <div>
          <h1 className="page-title">เลือกรายวิชาที่ต้องการเทียบโอน</h1>
          <p className="page-sub">เลือกรายวิชาของมหาวิทยาลัยก่อน จากนั้นกรอกข้อมูลรายวิชาที่คุณสอบผ่านมาแล้วเพื่อเทียบโอน</p>
        </div>
      </div>

      <div role="group" aria-label="หมวดวิชา" className="mb-4 grid grid-cols-2 gap-1 rounded-lg bg-slate-200/70 p-1 lg:hidden">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            aria-pressed={tab === t.key}
            onClick={() => setTab(t.key)}
            className={`min-h-[40px] rounded-md px-3 text-sm font-medium transition-colors ${
              tab === t.key ? 'bg-white text-navy-900 shadow-card' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
        <div className={tab === 'general' ? '' : 'hidden lg:block'}>
          <Generalcourse />
        </div>
        <div className={tab === 'special' ? '' : 'hidden lg:block'}>
          <Specialcourse />
        </div>
      </div>
    </AppLayout>
  );
};

export default AddCourse;
