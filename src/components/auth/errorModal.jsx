import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';

const ErrorModal = ({ errorMessage, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full shadow-2xl transform transition-all duration-300">
        <div className="flex items-center mb-2 sm:mb-3 md:mb-4">
          <FaExclamationCircle className="text-red-600 text-2xl sm:text-3xl md:text-4xl mr-2 sm:mr-3 animate-pulse" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Error</h2>
        </div>
        <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-4 sm:mb-5 md:mb-6">{errorMessage}</p>
        <div className="flex justify-end">
          <button
            className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base md:text-lg font-medium text-gray-800 bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
