import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourses } from '../../../store/actions/courseActions'
import { Link } from 'react-router-dom'

const Generalcourse = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
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

    return (
        <div className="container mx-auto py-8 px-4">
            {courses.map((subject) => (
                <div key={subject.id} className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{subject.name}</h2>
                    <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                        {subject.groups.map((group, index) => (
                            <tbody key={group.id}>
                                <tr>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => handleGroupClick(group.id)}
                                            className={`w-full text-left py-2 mb-2 rounded-lg shadow-md transition duration-300 ease-in-out
                                                ${selectedGroupId === group.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white'}`}
                                        >
                                            <div className="px-3">   {index + 1}. {group.name} </div>
                                        </button>

                                        {selectedGroupId === group.id && group.courses && group.courses.length > 0 && (
                                            <div className="mt-4">
                                                <table className="w-full table-auto border-collapse bg-gray-100 rounded-md">
                                                    <thead>
                                                        <tr className="text-white bg-blue-500">
                                                            <th className="py-2 px-4 text-left">รหัสวิชา</th>
                                                            <th className="py-2 px-4 text-left">ชื่อวิชา</th>
                                                            <th className="py-2 px-4 text-center">หน่วยกิต</th>
                                                            <th className="py-2 px-4 text-center"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {group.courses.map((course) => (
                                                            <tr key={course.id} className="border-b hover:bg-gray-200">
                                                                <td className="px-4 py-2">{course.courseCode}</td>
                                                                <td className="px-4 py-2">{course.courseNameTH}</td>
                                                                <td className="px-4 py-2 text-center">{course.credit}</td>
                                                                <td className="px-4 py-2 text-center">
                                                                    <Link to="/addcourse" state={{ courseId: course.id }}>
                                                                        <button className="bg-blue-500 text-white px-4 py-1 rounded-md shadow-lg hover:bg-blue-600 transition duration-300">
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
                    </table>
                </div>
            ))}
        </div>
    )
}

export default Generalcourse;
