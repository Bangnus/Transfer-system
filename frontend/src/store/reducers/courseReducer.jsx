// courseReducer.js
import {
    FETCH_COURSE_REQUEST,
    FETCH_COURSE_SUCCESS,
    FETCH_COURSE_FAILURE,
    ADD_SPECIAL_COURSE_REQUEST,
    ADD_SPECIAL_COURSE_SUCCESS,
    ADD_SPECIAL_FAIL,
} from '../actions/courseActions';

// Initial State
const initialState = {
    data: [],
    specialdata: [],
    loading: false,
    error: null,
};

// Reducer
const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case FETCH_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case ADD_SPECIAL_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADD_SPECIAL_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                specialdata: action.payload,
            };
        case ADD_SPECIAL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default courseReducer;
