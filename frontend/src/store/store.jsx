import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import coursesReducer from './reducers/courseReducer';
import { specialGroupReducer } from './reducers/specialGroupReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    specialGroup: specialGroupReducer,
  },
});

export default store;
