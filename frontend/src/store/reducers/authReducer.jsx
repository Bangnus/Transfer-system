const initialState = {
    token: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return { ...state, token: action.paylord };
        case "CLEAR_TOKEN":
            return { ...state, token: null };
        default:
            return state;
    }
};

export default authReducer