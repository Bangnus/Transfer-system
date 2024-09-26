import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store/store';
import './index.css';
import { RouterProvider, useNavigate } from 'react-router-dom';
import router from './routers';
import { setUser } from './store/actions/userActions';
import { ThemeProvider } from "@material-tailwind/react";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก localStorage เมื่อแอปโหลดขึ้นมาใหม่
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser))); // เก็บข้อมูลผู้ใช้ใน Redux store
    }
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Main />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
