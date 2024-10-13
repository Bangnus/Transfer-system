import axios from "axios";

// Action for adding a course transfer
export const addcoursetransfer = ({ courseCode, courseName, credit, grade, description, usernameId }) => async (dispatch) => {
    try {
        dispatch({
            type: 'ADD_COURSE_REQUEST',
        });

        const res = await axios.post('http://localhost:5000/api/addcourse/addcourse', {
            courseCode,
            courseName,
            credit,
            grade,
            description,
            usernameId,
        });

        dispatch({
            type: 'ADD_COURSE_SUCCESS',
            payload: res.data,
        });

        return res.data.id; // Returning course ID after creation
    } catch (error) {
        dispatch({
            type: 'ADD_COURSE_FAIL',
            payload: error.response ? error.response.data : 'Error adding course',
        });

        throw error;
    }
};

// Action for course transfer
export const coursetransfer = ({ originalCourseId, transferredCourseId, specialtransferredCourseId }) => async (dispatch) => {
    try {
        dispatch({
            type: 'COURSE_TRANSFER_REQUEST',
        });

        const res = await axios.post('http://localhost:5000/api/transsfer/coursetransfer', {
            originalCourseId,
            transferredCourseId,
            specialtransferredCourseId,
        });

        dispatch({
            type: 'COURSE_TRANSFER_SUCCESS',
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: 'COURSE_TRANSFER_FAIL',
            payload: error.response ? error.response.data : 'Error posting course transfer',
        });

        throw error;
    }
};
