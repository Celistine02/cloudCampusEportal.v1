import React from 'react';
import StudentAttendanceTable from './studentAttendanceTable';

const StudentAttendanceMainArea = () => {
  return (
    <div className="py-4 sm:py-4 bg-white text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Student Attendance</h1>
        <p className="mt-2 text-base text-gray-600">
          Manage your student attendance here.
        </p>
        <StudentAttendanceTable />
      </div>
    </div>
  );
};

export default StudentAttendanceMainArea;
