import React from 'react';
import Navbar from '../../components/connent-navbar/navbar';
import Generalcourse from './connent-generalcourse/generalcourse';
import Specialcourse from './content-specialcourse/specialcourse';

const AddCourse = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="flex m-5">
        <div className="w-1/2">
          <Generalcourse />
        </div>

        <div className="w-1/2">
          <Specialcourse />
        </div>
      </div>
    </>
  );
};

export default AddCourse;
