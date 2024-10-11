import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCourses } from '../../../store/actions/courseActions'
import Button from '../../../components/content-button/button'

const generalcourse = () => {
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const dispatch = useDispatch();
    const { data: courses = [], loading, error } = useSelector((state) => state.courses);
    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch])

    if (loading) {
        return <p>Loading Course...</p>;
    } else if (error) {
        return <p>Error: {error}</p>;
    }

    const handleGroupClick = (groupId) => {
        setSelectedGroupId(groupId === selectedGroupId ? null : groupId);
    };

    return (
        <>
            {courses.map((subject) => (
                <div key={subject.id} className="">
                    <div className="text-center">{subject.name}</div>
                    <table >
                        {subject.groups.map((group, index) => (
                            <tbody key={group.id}>
                                <tr>
                                    <td>
                                        <button onClick={() => handleGroupClick(group.id)}>
                                            {index + 1}.{group.name}
                                        </button>
                                        {selectedGroupId === group.id && group.courses && group.courses.length > 0 && (
                                            <div className="">
                                                <div className="">
                                                    <table className='text-center'>
                                                        <thead>
                                                            <tr>
                                                                <th>รหัสวิชา</th>
                                                                <th>ชื่อวิชา</th>
                                                                <th>หน่วยกิต</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {group.courses.map((course) => (

                                                                <tr key={course.id} >
                                                                    <td>
                                                                        {course.courseCode}
                                                                    </td>
                                                                    <td>
                                                                        {course.courseNameTH}
                                                                    </td>
                                                                    <td>
                                                                        {course.credit}
                                                                    </td>
                                                                    <td>
                                                                        <Button label='เลือก'></Button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        )}
                                        {selectedGroupId === group.id && (!group.courses || group.courses.length === 0) && (
                                            <p>ไม่มีวิชาในกลุ่มนี้</p>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            ))}
        </>
    )
}

export default generalcourse