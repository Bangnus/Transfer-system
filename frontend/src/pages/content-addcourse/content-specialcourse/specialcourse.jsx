import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpecialcourse } from '../../../store/actions/courseActions';
import { Link } from 'react-router-dom';
const SpecialCourse = () => {
  const [selectedGroupID, setSelectedGroupID] = useState(null);
  const [selectedSubGroupID, setSelectedSubGroupID] = useState(null);
  const dispatch = useDispatch();
  const { specialdata: specialcourses = [] } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchSpecialcourse());
  }, [dispatch]);

  const handleGroupClick = (groupid) => {
    setSelectedGroupID(groupid === selectedGroupID ? null : groupid);
  };

  const handleSubGroupClick = (subGroupId) => {
    setSelectedSubGroupID(subGroupId === selectedSubGroupID ? null : subGroupId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {specialcourses.map((subject) => (
        <div key={subject.id} className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{subject.name}</h2>
          <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            {subject.SpecialGroup.map((SpecialGroup, groupIndex) => (
              <tbody key={SpecialGroup.id}>
                <tr>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleGroupClick(SpecialGroup.id)}
                      className={`w-full text-left py-2 mb-2 rounded-lg shadow-md transition duration-300 ease-in-out
                        ${selectedGroupID === SpecialGroup.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                    >
                      <div className="px-3">{groupIndex + 1}. {SpecialGroup.name}</div>
                    </button>

                    {([0, 2].includes(groupIndex)) && selectedGroupID === SpecialGroup.id && (
                      <div className="mt-4">
                        {SpecialGroup.SpecialCourse && SpecialGroup.SpecialCourse.length > 0 ? (
                          <table className="w-full text-center border-collapse bg-gray-100 rounded-md">
                            <thead>
                              <tr className="text-white bg-blue-500">
                                <th className="py-2 px-4">รหัสวิชา</th>
                                <th className="py-2 px-4">ชื่อวิชา</th>
                                <th className="py-2 px-4">หน่วยกิต</th>
                                <th className="py-2 px-4"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {SpecialGroup.SpecialCourse.map((SpecialCourse) => (
                                <tr key={SpecialCourse.id} className="border-b hover:bg-gray-200">
                                  <td className="px-4 py-2">{SpecialCourse.courseCode}</td>
                                  <td className="px-4 py-2">{SpecialCourse.courseNameTH}</td>
                                  <td className="px-4 py-2">{SpecialCourse.credit}</td>
                                  <td className="px-4 py-2">
                                    <button className="bg-blue-500 text-white px-4 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300">เลือก</button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-red-500 mt-4">ไม่มีวิชาในกลุ่มนี้</p>
                        )}
                      </div>
                    )}

                    {groupIndex === 1 && selectedGroupID === SpecialGroup.id && SpecialGroup.SubSpecialtyGroup && SpecialGroup.SubSpecialtyGroup.length > 0 && (
                      <div className="mt-4">
                        {SpecialGroup.SubSpecialtyGroup.map((SubSpecialtyGroup, subGroupIndex) => (
                          <div key={SubSpecialtyGroup.id}>
                            <button
                              onClick={() => handleSubGroupClick(SubSpecialtyGroup.id)}
                              className={`w-full text-left py-2 mb-2 rounded-lg shadow-md transition duration-300 ease-in-out
                                ${selectedSubGroupID === SubSpecialtyGroup.id
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white'}`}
                            >
                              <div className="px-3">
                                {groupIndex + 1}.{subGroupIndex + 1} {SubSpecialtyGroup.name}
                              </div>
                            </button>

                            {selectedSubGroupID === SubSpecialtyGroup.id && SubSpecialtyGroup.SpecialCourse && SubSpecialtyGroup.SpecialCourse.length > 0 && (
                              <div className="mt-4">
                                <table className="w-full text-center border-collapse bg-gray-100 rounded-md">
                                  <thead>
                                    <tr className="text-white bg-blue-500">
                                      <th className="py-2 px-4 text-left">รหัสวิชา</th>
                                      <th className="py-2 px-4 text-left">ชื่อวิชา</th>
                                      <th className="py-2 px-4">หน่วยกิต</th>
                                      <th className="py-2 px-4"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {SubSpecialtyGroup.SpecialCourse.map((SpecialCourse) => (
                                      <tr key={SpecialCourse.id} className="border-b hover:bg-gray-200">
                                        <td className="px-4 py-2 text-left">{SpecialCourse.courseCode}</td>
                                        <td className="px-4 py-2 text-left">{SpecialCourse.courseNameTH}</td>
                                        <td className="px-4 py-2">{SpecialCourse.credit}</td>
                                        <td className="px-4 py-2">
                                          <Link to="/addcourse" state={{ specialcourseId: SpecialCourse.id }}>
                                            <button className="bg-blue-500 text-white px-4 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300">เลือก</button>
                                          </Link>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}

                            {selectedSubGroupID === SubSpecialtyGroup.id && (!SubSpecialtyGroup.SpecialCourse || SubSpecialtyGroup.SpecialCourse.length === 0) && (
                              <p className="text-red-500 mt-4">ไม่มีวิชาในกลุ่มนี้</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      ))}
    </div>
  );
};

export default SpecialCourse;
