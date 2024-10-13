import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GeneralCourse from './GeneralCourse'; // สมมติว่าหน้าเดิมชื่อ GeneralCourse
import CourseForm from './CourseForm'; // หน้าใหม่ที่จะแสดงฟอร์ม

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/courses" element={<GeneralCourse />} />
        <Route path="/course-form/:id" element={<CourseForm />} />
      </Routes>
    </Router>
  );
};

export default App;
