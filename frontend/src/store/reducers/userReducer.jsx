const initialState = {
  user: null,
  logintime: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        logintime: Date.now(),
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        logintime: null,
      };
    default:
      return state;
  }
};

export default userReducer;
