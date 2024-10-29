import React from 'react';
import Navbar from '../../components/connent-navbar/navbar';
import Generalcourse from './connent-generalcourse/generalcourse';
import Specialcourse from './content-specialcourse/specialcourse';
import BreadcrumbsCustom from '../../components/content-Breadcrumbs/Breadcrumbs';

const AddCourse = () => {

  const breadcrumbLinks = [
    { label: "Home", to: "/" },
    { label: "Tranfer", to: '/tranfer' },
    { label: "Course" }
  ];
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="bg-blue-50 p-2 rounded-md shadow-sm">
        <BreadcrumbsCustom links={breadcrumbLinks} />
      </div>
      <div className="flex m-3  rounded-lg animate-fade animate-once animate-ease-in-out animate-normal animate-fill-forwards">
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
