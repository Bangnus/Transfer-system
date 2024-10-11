// courseActions.js
import axios from 'axios';

// Action Types
export const FETCH_COURSE_REQUEST = 'FETCH_COURSE_REQUEST';
export const FETCH_COURSE_SUCCESS = 'FETCH_COURSE_SUCCESS';
export const FETCH_COURSE_FAILURE = 'FETCH_COURSE_FAILURE';
export const ADD_SPECIAL_COURSE_REQUEST = 'ADD_SPECIAL_COURSE_REQUEST';
export const ADD_SPECIAL_COURSE_SUCCESS = 'ADD_SPECIAL_COURSE_SUCCESS';
export const ADD_SPECIAL_FAIL = 'ADD_SPECIAL_FAIL';

// Action Creators
export const fetchcourseRequest = () => {
    return {
        type: FETCH_COURSE_REQUEST,
    };
};

export const fetchcourseSuccess = (courses) => {
    return {
        type: FETCH_COURSE_SUCCESS,
        payload: courses,
    };
};

export const fetchcourseFailure = (error) => {
    return {
        type: FETCH_COURSE_FAILURE,
        payload: error,
    };
};

// Async Action Creator for Fetching Courses
export const fetchCourses = () => {
    return async (dispatch) => {
        dispatch(fetchcourseRequest()); // เริ่มต้นการดึงข้อมูล
        try {
            const res = await axios.get('http://localhost:5000/api/subject/subjectCategoryWithGroups');
            const courses = res.data; // สมมุติว่า API คืนค่าข้อมูลในรูปแบบ JSON
            dispatch(fetchcourseSuccess(courses)); // ส่งข้อมูลที่ได้ไปยัง reducer
        } catch (error) {
            dispatch(fetchcourseFailure(error.message)); // จัดการข้อผิดพลาด
        }
    };
};

// Async Action Creator for Fetching Special Courses
export const fetchSpecialcourse = () => async (dispatch) => {
    dispatch({ type: ADD_SPECIAL_COURSE_REQUEST });
    try {
        const res = await axios.get('http://localhost:5000/api/subject/specialsubjectCategotyWithGroup');
        dispatch({
            type: ADD_SPECIAL_COURSE_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: ADD_SPECIAL_FAIL,
            payload: error.response ? error.response.data : 'Error Get SpecialCourse',
        });
    }
};
