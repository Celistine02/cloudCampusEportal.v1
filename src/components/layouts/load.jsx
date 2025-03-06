import React from 'react';
import { PulseLoader } from 'react-spinners';

const Load = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-80">
      <div className="flex flex-col items-center">
        <div className="loader-container light-loader">
          <PulseLoader color="#000000" size={20} />
          <p className="text-gray-800 mt-4 text-lg font-semibold animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Load;

