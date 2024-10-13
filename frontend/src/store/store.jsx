import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import coursesReducer from './reducers/courseReducer';
import { specialGroupReducer } from './reducers/specialGroupReducer';
import { courseReducer } from './reducers/coursefransferReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    specialGroup: specialGroupReducer,
    addcoursetransfer: courseReducer,
  },
});

export default store;
