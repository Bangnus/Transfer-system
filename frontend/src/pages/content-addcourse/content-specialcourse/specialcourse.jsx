import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpecialcourse } from '../../../store/actions/courseActions';
import EmptyState from '../../../components/ui/EmptyState';
import { AccordionButton, CourseRows, CourseDetailModal, CatalogueSkeleton, errorText } from '../courseParts';

const TITLE = 'หมวดวิชาเฉพาะ';

const countCourses = (group) =>
  (group.SubSpecialtyGroup || []).reduce((sum, sub) => sum + (sub.SpecialCourse?.length || 0), 0);

const SpecialCourse = () => {
  const [selectedGroupID, setSelectedGroupID] = useState(null);
  const [selectedSubGroupID, setSelectedSubGroupID] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null)
  const dispatch = useDispatch();
  const { specialdata: specialcourses = [], loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchSpecialcourse());
  }, [dispatch]);

  const handleGroupClick = (groupid) => {
    setSelectedGroupID(groupid === selectedGroupID ? null : groupid);
  };

  const handleSubGroupClick = (subGroupId) => {
    setSelectedSubGroupID(subGroupId === selectedSubGroupID ? null : subGroupId);
  };

  const closeModel = () => setSelectedCourse(null);

  // `loading` and `error` are shared with the general catalogue, so only use them while this list is empty
  if (specialcourses.length === 0) {
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
      {specialcourses.map((subject) => (
        <section key={subject.id} className="card overflow-hidden" aria-labelledby={`spec-cat-${subject.id}`}>
          <div className="card-head">
            <h2 id={`spec-cat-${subject.id}`} className="card-title">{subject.name}</h2>
            <span className="text-xs text-slate-500"><span className="num">{subject.SpecialGroup.length}</span> กลุ่ม</span>
          </div>
          <ul className="divide-y divide-slate-100">
            {subject.SpecialGroup.map((SpecialGroup, groupIndex) => {
              const open = selectedGroupID === SpecialGroup.id;
              const panelId = `spec-group-${SpecialGroup.id}`;
              const subGroups = SpecialGroup.SubSpecialtyGroup || [];
              return (
                <li key={SpecialGroup.id}>
                  <AccordionButton
                    expanded={open}
                    onClick={() => handleGroupClick(SpecialGroup.id)}
                    controls={panelId}
                    number={groupIndex + 1}
                    name={SpecialGroup.name}
                    count={countCourses(SpecialGroup)}
                  />
                  {open && (
                    <div id={panelId} className="border-t border-slate-100">
                      {subGroups.length === 0 ? (
                        <p className="py-4 pl-8 pr-4 text-sm text-slate-500 sm:pl-10">ไม่มีวิชาในกลุ่มนี้</p>
                      ) : (
                        <ul className="divide-y divide-slate-100">
                          {subGroups.map((SubSpecialtyGroup, subGroupIndex) => {
                            const subOpen = selectedSubGroupID === SubSpecialtyGroup.id;
                            const subPanelId = `spec-sub-${SubSpecialtyGroup.id}`;
                            return (
                              <li key={SubSpecialtyGroup.id}>
                                <AccordionButton
                                  level={2}
                                  expanded={subOpen}
                                  onClick={() => handleSubGroupClick(SubSpecialtyGroup.id)}
                                  controls={subPanelId}
                                  number={`${groupIndex + 1}.${subGroupIndex + 1}`}
                                  name={SubSpecialtyGroup.name}
                                  count={SubSpecialtyGroup.SpecialCourse?.length || 0}
                                />
                                {subOpen && (
                                  <div id={subPanelId} className="border-t border-slate-100">
                                    <CourseRows
                                      courses={SubSpecialtyGroup.SpecialCourse}
                                      stateKey="specialcourseId"
                                      onDetail={setSelectedCourse}
                                      indent
                                    />
                                  </div>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <CourseDetailModal course={selectedCourse} stateKey="specialcourseId" onClose={closeModel} />
    </div>
  );
};

export default SpecialCourse;
