import React from 'react';
import SubjectTable from './subjectTable';

const SubjectMainArea = () => {
  return (
    <div className="py-4 sm:py-4 bg-white text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Subjects</h1>
        <p className="mt-2 text-base text-gray-600">
          Manage your subjects and related activities here.
        </p>
        <SubjectTable />
      </div>
    </div>
  );
};

export default SubjectMainArea;
