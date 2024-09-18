import { createBrowserRouter } from 'react-router-dom';
import Login from "./pages/content-login/login.jsx"
import Student from './pages/content-student/student.jsx'
import Personnel from './pages/personnel.jsx'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/student",
      element: <Student/>
    },
    {
      path: "/personnel",
      element: <Personnel/>
    },
  ]);

export default router;
