import React from 'react';
import HomeworkTable from './homeworkTable';

const HomeworkMainArea = () => {
  return (
    <div className="py-4 sm:py-4 bg-white text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Learning Resources</h1>
        <p className="mt-2 text-base text-gray-600">
          Manage your homeworks and related activities here.
        </p>
        <HomeworkTable />
      </div>
    </div>
  );
};

export default HomeworkMainArea;
