import {
    FETCH_COURSE_REQUEST,
    FETCH_COURSE_SUCCESS,
    FETCH_COURSE_FAILURE
} from '../actions/courseActions';

const initialState = {
    daat: [],
    loading: false,
    error: null,
};

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
        default:
            return state;
    }
};

export default courseReducer;