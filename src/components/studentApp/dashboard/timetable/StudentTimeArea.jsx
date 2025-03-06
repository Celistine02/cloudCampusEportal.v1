import React from "react";
import StudentTimeTable from "./studentTimeTable";


const TeacherTimeArea = () => {
  return (
    <div className="flex flex-col w-full bg-white-100 dark:bg-white-900">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"> {/* Changed max-w-7xl to max-w-full */}
        <div className="bg-white dark:bg-white-800 shadow rounded-lg overflow-x-auto">
          <h1 className="text-2xl font-bold mb-4">Your Time Area</h1>
        </div>

        <div className="bg-white dark:bg-white-800 shadow rounded-lg">
          <StudentTimeTable />
        </div>
      </div>
    </div>
  );
};

export default TeacherTimeArea;
