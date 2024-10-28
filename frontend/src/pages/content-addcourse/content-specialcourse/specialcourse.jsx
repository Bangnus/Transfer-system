import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpecialcourse } from '../../../store/actions/courseActions';
import { Link } from 'react-router-dom';
const SpecialCourse = () => {
  const [selectedGroupID, setSelectedGroupID] = useState(null);
  const [selectedSubGroupID, setSelectedSubGroupID] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null)
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

  const handleDetailClick = (SpecialCourse) => {
    setSelectedCourse(SpecialCourse)
  }
  const closeModel = () => {
    setSelectedCourse(null)
  }

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

                    {/* {([0, 2].includes(groupIndex)) && selectedGroupID === SpecialGroup.id && (
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
                    )} */}

                    {selectedGroupID === SpecialGroup.id && SpecialGroup.SubSpecialtyGroup && SpecialGroup.SubSpecialtyGroup.length > 0 && (
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
                                      <th className="py-2 pr-2 pl-1 text-center">รหัสวิชา</th>
                                      <th className="py-2 px-1 text-left">ชื่อวิชา</th>
                                      <th className="py-2 px-1">หน่วยกิต</th>
                                      <th className="py-2 px-1">รายละเอียด</th>
                                      <th className="py-2 px-1"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {SubSpecialtyGroup.SpecialCourse.map((SpecialCourse) => (
                                      <tr key={SpecialCourse.id} className="border-b hover:bg-gray-200">
                                        <td className="pr-2 pl-1 py-2 text-center">{SpecialCourse.courseCode}</td>
                                        <td className="px-1 py-2 text-left">{SpecialCourse.courseNameTH}</td>
                                        <td className="px-1 py-2">{SpecialCourse.credit}</td>
                                        <td className='px-1 py-2 text-center'>
                                          <button
                                            onClick={() => handleDetailClick(SpecialCourse)}
                                            className='bg-blue-500 text-white px-2 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300'
                                          >
                                            รายละเอียด
                                          </button>
                                        </td>
                                        <td className="px-1 py-2">
                                          <Link to="/addcourse" state={{ specialcourseId: SpecialCourse.id }}>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300">เลือก</button>
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
            {selectedCourse && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={closeModel}
              >
                <div
                  className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative mx-4"
                  onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกในเนื้อหา modal
                >
                  <h2 className="text-2xl font-semibold mb-4 text-center">รายละเอียดวิชา</h2>
                  <div className="text-gray-600 space-y-4 text-sm">
                    <p><strong>รหัสวิชา:</strong> {selectedCourse.courseCode}</p>
                    <p><strong>ชื่อวิชา (TH):</strong> {selectedCourse.courseNameTH}</p>
                    <p><strong>ชื่อวิชา (ENG):</strong> {selectedCourse.courseNameENG}</p>
                    <p><strong>วิชาบังคับก่อน:</strong> {selectedCourse.prerequisiteTH || '-'}</p>
                    <p><strong>Prerequisite:</strong> {selectedCourse.prerequisiteENG || '-'}</p>
                    <p><strong>หน่วยกิต:</strong> {selectedCourse.credit}</p>
                    <p><strong>คำอธิบายรายวิชา (TH):</strong> {selectedCourse.descriptionTH}</p>
                    <p><strong>คำอธิบายรายวิชา (ENG):</strong> {selectedCourse.descriptionENG}</p>
                  </div>
                  <button
                    onClick={closeModel}
                    className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 focus:outline-none"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            )}
          </table>
        </div>
      ))}
    </div>
  );
};

export default SpecialCourse;
