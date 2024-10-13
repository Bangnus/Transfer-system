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

      <div className="flex m-3  rounded-lg ">
        <div className="w-1/2 h-full p-5 border-r ">
          <div className="bg-white p-4 rounded-lg shadow-md  overflow-y-auto ">
            <Generalcourse />
          </div>
        </div>

        <div className="w-1/2 h-full p-5">
          <div className="bg-white p-4 rounded-lg shadow-md  overflow-y-auto">
            <Specialcourse />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
