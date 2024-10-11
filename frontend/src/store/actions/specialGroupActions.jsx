import axios from "axios";

export const addspecialGroup = ({ name, secname }) => async (dispatch) => {
    try {
        dispatch({ type: 'SPECIAL_GROUP_ADD_REQUEST' });
        const res = await axios.post('http://localhost:5000/api/addsubSpecial/addspecialgroup', {
            name,
            secname,
        });
        dispatch({
            type: 'SPECIAL_GROUP_ADD_SUCCESS',
            payload: res.data,
        });
        return res.data.id
    } catch (error) {
        dispatch({
            type: 'SPECIAL_GROUP_ADD_FAIL',
            payload: error.response ? error.response.data : 'An error occurred',
        })
        throw error;
    }
}

export const addSubSpecialtyGroup = ({ name, SpecialGroupID }) => async (dispatch) => {
    try {
        dispatch({ type: 'ADD_SPECIAL_REQUEST' });
        const res = await axios.post('http://localhost:5000/api/addsubSpecial/addSubSpecialtyGroup', {
            name,
            SpecialGroupID,
        });
        dispatch({
            type: 'ADD_SPECIAL_SUCCESS',
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: 'ADD_SPECIAL_FAIL',
            payload: error.res ? error.res.data : 'An error occurred',
        })
    }
}

export const addspecialcourse = ({
    courseCode,
    courseNameTH,
    courseNameENG,
    prerequisiteTH,
    prerequisiteENG,
    credit,
    descriptionTH,
    descriptionENG,
    SubSpecialtyGroupID
}) => async (dispatch) => {
    try {
        dispatch({ type: "ADD_SPECIAL_COURSE" });
        const res = await axios.post('http://localhost:5000/api/addsubSpecial/addspecialcourse', {
            courseCode,
            courseNameTH,
            courseNameENG,
            prerequisiteTH,
            prerequisiteENG,
            credit,
            descriptionTH,
            descriptionENG,
            SubSpecialtyGroupID
        });
        dispatch({ type: "ADD_SPECIAL_COURSE_SUCCESS", payload: res.data });
    } catch (error) {
        dispatch({ type: "ADD_SPECIAL_COURSE_FAIL", payload: error.response ? error.response.data : "Error post special course" })
    }
}
