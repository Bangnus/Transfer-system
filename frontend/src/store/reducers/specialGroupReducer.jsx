
const initiaState = {
    loading: false,
    specialGroup: null,
    SubSpecialtyGroup: null,
    specialcourse: null,
    error: null,
}

export const specialGroupReducer = (state = initiaState, action) => {
    switch (action.type) {
        case 'ADD_SPECIAL_COURSE':
        case 'SPECIAL_GROUP_ADD_REQUEST':
        case 'ADD_SPECIAL_REQUEST':
            return { ...state, loading: true };
        case 'ADD_SPECIAL_COURSE_SUCCESS':
            return {...state, loading:false, specialcourse: action.payload};
        case 'SPECIAL_GROUP_ADD_SUCCESS':
            return { ...state, loading: false, specialGroup: action.payload };
        case 'ADD_SPECIAL_SUCCESS':
            return { ...state, loading: false, SubSpecialtyGroup: action.payload };
        case 'ADD_SPECIAL_COURSE_FAIL':
        case 'SPECIAL_GROUP_ADD_FAIL':
        case 'ADD_SPECIAL_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}