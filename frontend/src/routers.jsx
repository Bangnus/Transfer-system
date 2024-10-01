import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/content-login/login.jsx';
import Home from './pages/content-home/home.jsx';
import Personnel from './pages/personnel.jsx';
import Tranfer from './pages/content-transfer/tranfer.jsx'
import Addcourse from './pages/content-addcourse/addcourse.jsx'

import ProtectedRoute from './store/ProtectedRoute/ProtectedRoute';
import PublicRoute from './store/PublicRoute/PublicRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ), // ใช้ PublicRoute เพื่อป้องกันการเข้าถึงถ้าล็อกอินแล้ว
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute allowedTypes={['student']}>  {/* อนุญาตเฉพาะ student */}
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: '/personnel',
    element: (
      <ProtectedRoute allowedTypes={['personnel']}>  {/* อนุญาตเฉพาะ personnel */}
        <Personnel />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tranfer',
    element: (
      <ProtectedRoute allowedTypes={['student']}>  
        <Tranfer/>
      </ProtectedRoute>
    ),
  },
  {
    path: '/addcourse',
    element: (
      <ProtectedRoute allowedTypes={['student']}>  
        <Addcourse/>
      </ProtectedRoute>
    ),
  },
]);

export default router;
