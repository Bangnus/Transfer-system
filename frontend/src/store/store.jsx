import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import coursesReducer from './reducers/courseReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,

  },
});

export default store;
