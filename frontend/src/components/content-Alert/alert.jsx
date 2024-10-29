import React from 'react';

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed top-2 right-0 m-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-transform transform -translate-y-full">
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;
