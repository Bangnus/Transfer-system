import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/content-login/login.jsx';
import Home from './pages/content-home/home.jsx';
import Personnel from './pages/content-personnel/personnel.jsx';
import Tranfer from './pages/content-transfer/tranfer.jsx'
import Layoutcourse from './pages/content-addcourse/Layoutcourse.jsx'
import Addspecialgroup from './pages/connent-subspecialtygroup/subspecialtygroup.jsx'
import Addcourse from './pages/content-addcourse/addcourse.jsx'
import DetailStudent from './pages/content-managecourse/detailstudent.jsx'

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
        <Tranfer />
      </ProtectedRoute>
    ),
  },
  {
    path: '/course',
    element: (
      <ProtectedRoute allowedTypes={['student']}>
        <Layoutcourse />
      </ProtectedRoute>
    ),
  },
  {
    path: '/addcourse',
    element: (
      <ProtectedRoute allowedTypes={['student']}>
        <Addcourse />
      </ProtectedRoute>
    ),
  },
  {
    path: '/addspecialgroup',
    element: (
      <ProtectedRoute allowedTypes={['personnel']}>
        <Addspecialgroup />
      </ProtectedRoute>
    ),
  },
  {
    path: '/detail/:firstname',
    element: (
      <ProtectedRoute allowedTypes={['personnel']}>
        <DetailStudent />
      </ProtectedRoute>
    ),
  }
]);

export default router;
