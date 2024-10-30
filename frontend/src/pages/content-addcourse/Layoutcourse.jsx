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
      <div className="bg-blue-50 p-2 rounded-md shadow-sm ">
        <BreadcrumbsCustom links={breadcrumbLinks} />
      </div>
      <div className="flex m-3  rounded-lg xs:flex-col sm:flex-col md:flex-col lg:flex-col animate-fade animate-once animate-ease-in-out animate-normal animate-fill-forwards">
        <div className="w-1/2 h-full p-5 border-r xs:w-full sm:w-full md:w-full lg:w-full">
          <div className="bg-white p-4 rounded-lg shadow-md  overflow-y-auto ">
            <Generalcourse />
          </div>
        </div>

        <div className="w-1/2 h-full p-5 xs:w-full sm:w-full md:w-full lg:w-full">
          <div className="bg-white p-4 rounded-lg shadow-md  overflow-y-auto">
            <Specialcourse />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
