import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourses } from '../../../store/actions/courseActions'
import { Link } from 'react-router-dom'

const Generalcourse = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const dispatch = useDispatch();
    const { data: courses = [], loading, error } = useSelector((state) => state.courses);

    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);

    if (loading) {
        return <div className="text-center py-10 text-xl">Loading Course...</div>;
    } else if (error) {
        return <div className="text-center py-10 text-xl text-red-500">Error: {error}</div>;
    }

    const handleGroupClick = (groupId) => {
        setSelectedGroupId(groupId === selectedGroupId ? null : groupId);
    };

    const handleDetailClick = (course) => {
        setSelectedCourse(course);
    }

    const closeModel = () => {
        setSelectedCourse(null)
    }
    console.log(selectedCourse)
    return (
        <div className="container mx-auto py-8 px-4 ">
            {courses.map((subject) => (
                <div key={subject.id} className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 xs:text-[20px]">{subject.name}</h2>
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        {subject.groups.map((group, index) => (
                            <tbody key={group.id}>
                                <tr>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleGroupClick(group.id)}
                                            className={`w-full text-left py-2 mb-2 rounded-lg shadow-md transition duration-300 ease-in-out xs:text-[14px] xs:mb-0
                                                ${selectedGroupId === group.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                                        >
                                            <div className="px-3">   {index + 1}. {group.name} </div>
                                        </button>

                                        {selectedGroupId === group.id && group.courses && group.courses.length > 0 && (
                                            <div className="mt-4">
                                                <table className="w-full table-auto border-collapse bg-gray-100 rounded-md xs:text-[10px] sm:text-[12px] xl:text-[12px]">
                                                    <thead>
                                                        <tr className="text-white bg-blue-500">
                                                            <th className="py-2 pr-2 pl-1 text-center ">รหัสวิชา</th>
                                                            <th className="py-2 px-1 text-left ">ชื่อวิชา</th>
                                                            <th className="py-2 px-1 text-center xs:py-0">หน่วยกิต</th>
                                                            <th className='py-2 px-1 text-center xs:py-0'>รายละเอียด</th>
                                                            <th className="py-2 px-1 text-center xs:py-0"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {group.courses.map((course) => (
                                                            <tr key={course.id} className="border-b hover:bg-gray-200">
                                                                <td className="pr-2 pl-1 py-2 text-center">{course.courseCode}</td>
                                                                <td className="px-1 py-2 ">{course.courseNameTH}</td>
                                                                <td className="px-1 py-2 text-center ">{course.credit}</td>
                                                                <td className='px-1 py-2 text-center '>
                                                                    <button
                                                                        onClick={() => handleDetailClick(course)}
                                                                        className='bg-blue-500 text-white px-2 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300  '
                                                                    >
                                                                        รายละเอียด
                                                                    </button>
                                                                </td>
                                                                <td className="px-1 py-2 text-center">
                                                                    <Link to="/addcourse" state={{ courseId: course.id }}>
                                                                        <button className="bg-blue-500 text-white px-2 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300 ">
                                                                            เลือก
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {selectedGroupId === group.id && (!group.courses || group.courses.length === 0) && (
                                            <p className="mt-4 text-red-500">ไม่มีวิชาในกลุ่มนี้</p>
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
                                    className={`bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative mx-4  animate-fade-up animate-once animate-ease-in-out animate-normal animate-fill-forwards`}
                                    onClick={(e) => e.stopPropagation()} // ป้องกันการปิด modal เมื่อคลิกในเนื้อหา modal
                                >
                                    <h2 className="text-2xl font-semibold mb-4 text-center">รายละเอียดวิชา</h2>
                                    <div className="text-gray-600 space-y-2 text-sm xs:text-[10px]">
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
                                        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 focus:outline-none "
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
    )
}

export default Generalcourse;
