const initialState = {
    loading: false,
    error: null,
    coursetransfer: null,  // Store for the added course response
    courseTransferSuccess: null,  // Store for successful course transfer
};

// Reducer to handle course adding and course transfer actions
export const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COURSE_REQUEST':
            return { ...state, loading: true };
        case 'ADD_COURSE_SUCCESS':
            return { ...state, loading: false, coursetransfer: action.payload };
        case 'ADD_COURSE_FAIL':
            return { ...state, loading: false, error: action.payload };

        case 'COURSE_TRANSFER_REQUEST':
            return { ...state, loading: true };
        case 'COURSE_TRANSFER_SUCCESS':
            return { ...state, loading: false, courseTransferSuccess: action.payload };
        case 'COURSE_TRANSFER_FAIL':
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};
