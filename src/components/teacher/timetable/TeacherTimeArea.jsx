import React from "react";
import TeacherTimeTable from "./teacherTimeTable";
import SubjectMainArea from "./../subjects/subjectMainArea";

const TeacherTimeArea = () => {
  return (
    <div className="flex flex-col w-full bg-white-100 dark:bg-white-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white dark:bg-white-800 shadow rounded-lg overflow-x-auto">
          <h1 className="text-2xl font-bold mb-4">Teacher Time Area</h1>
        </div>
        <div className="bg-white dark:bg-white-800 shadow rounded-lg overflow-x-auto">
          <SubjectMainArea />
        </div>
        <div className="bg-white dark:bg-white-800 shadow rounded-lg overflow-x-auto">
          <TeacherTimeTable />
        </div>
      </div>
    </div>
  );
};

export default TeacherTimeArea;
