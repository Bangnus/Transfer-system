import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourses } from '../../../store/actions/courseActions'
import EmptyState from '../../../components/ui/EmptyState'
import { AccordionButton, CourseRows, CourseDetailModal, CatalogueSkeleton, errorText } from '../courseParts'

const TITLE = 'หมวดวิชาศึกษาทั่วไป';

const Generalcourse = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const dispatch = useDispatch();
    const { data: courses = [], loading, error } = useSelector((state) => state.courses);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    const handleGroupClick = (groupId) => {
        setSelectedGroupId(groupId === selectedGroupId ? null : groupId);
    };

    const closeModel = () => setSelectedCourse(null);

    // `loading` and `error` are shared with the special catalogue, so only use them while this list is empty
    if (courses.length === 0) {
        return (
            <section className="card overflow-hidden" aria-label={TITLE}>
                <div className="card-head"><h2 className="card-title">{TITLE}</h2></div>
                {loading ? (
                    <>
                        <p className="px-4 pt-4 text-sm text-slate-500 sm:px-5">กำลังโหลดรายวิชา…</p>
                        <CatalogueSkeleton />
                    </>
                ) : error ? (
                    <p className="px-4 py-6 text-sm text-red-600 sm:px-5">โหลดรายวิชาไม่สำเร็จ: {errorText(error)}</p>
                ) : (
                    <EmptyState title="ยังไม่มีรายวิชาในหมวดนี้" />
                )}
            </section>
        );
    }

    return (
        <div className="space-y-6">
            {courses.map((subject) => (
                <section key={subject.id} className="card overflow-hidden" aria-labelledby={`gen-cat-${subject.id}`}>
                    <div className="card-head">
                        <h2 id={`gen-cat-${subject.id}`} className="card-title">{subject.name}</h2>
                        <span className="text-xs text-slate-500"><span className="num">{subject.groups.length}</span> กลุ่ม</span>
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {subject.groups.map((group, index) => {
                            const open = selectedGroupId === group.id;
                            const panelId = `gen-group-${group.id}`;
                            return (
                                <li key={group.id}>
                                    <AccordionButton
                                        expanded={open}
                                        onClick={() => handleGroupClick(group.id)}
                                        controls={panelId}
                                        number={index + 1}
                                        name={group.name}
                                        count={group.courses?.length || 0}
                                    />
                                    {open && (
                                        <div id={panelId} className="border-t border-slate-100">
                                            <CourseRows courses={group.courses} stateKey="courseId" onDetail={setSelectedCourse} />
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </section>
            ))}
            <CourseDetailModal course={selectedCourse} stateKey="courseId" onClose={closeModel} />
        </div>
    )
}

export default Generalcourse;
