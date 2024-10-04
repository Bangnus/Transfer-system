import React, { useEffect } from 'react';
import Navbar from '../../components/connent-navbar/navbar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses } from '../../store/actions/courseActions';

const AddCourse = () => {
  const { data: courses = [], loading, error } = useSelector((state) => state.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default AddCourse;
