import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "flowbite-react";
import useSubjectStore from './../../../../production/zustand/features/teachers/createSubjects';

const MyClasses = () => {
  const navigate = useNavigate();
  const { subjects, loading, error, getSubjectsByTeacher } = useSubjectStore();

  useEffect(() => {
    getSubjectsByTeacher();
  }, [getSubjectsByTeacher]);

  return (
    <div className="py-8 sm:py-10 lg:py-12 font-mainFont bg-white text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <p className="text-2xl font-bold text-gray-800">Subjects Brief</p>
          </div>

          <div className="mt-4 sm:mt-0">
            <Button
              onClick={() => navigate("/my-portal/student/studynotes")}
              color="light"
              className="inline-flex items-center text-sm font-semibold tracking-widest text-gray-800 uppercase hover:text-gray-600"
            >
              See all classes
              <svg
                className="w-5 h-5 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Button>
          </div>
        </div>

        {/* table of deposits by agent */}
        <div className="flex flex-col mt-6 lg:mt-10">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
              {/* table */}
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                {/* table titles */}
                <thead className="bg-gray-100 text-gray-800 uppercase text-xs sm:text-sm md:text-base leading-normal">
                  <tr>
                    <th className="py-4 px-2 sm:px-4 md:px-6 text-left">
                      <div className="flex items-center">Class Name</div>
                    </th>

                    <th className="py-4 px-2 sm:px-4 md:px-6 text-left">
                      <div className="flex items-center">Form</div>
                    </th>

                    <th className="py-4 px-2 sm:px-4 md:px-6 text-left">
                      <div className="flex items-center">Student Count</div>
                    </th>

                    <th className="py-4 px-2 sm:px-4 md:px-6 text-left">
                      <div className="flex items-center">Term Mark</div>
                    </th>

                    <th className="py-4 px-2 sm:px-4 md:px-6 text-left">
                      <div className="flex items-center">Files</div>
                    </th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody className="text-gray-800 text-xs sm:text-sm md:text-base font-medium">
                  {loading && (
                    <tr><td colSpan="5" className="text-center py-6">Loading subjects...</td></tr>
                  )}
                  {error && (
                    <tr><td colSpan="5" className="text-center py-6">Error: {error}</td></tr>
                  )}
                  {!loading && !error && subjects.length === 0 && (
                    <tr><td colSpan="5" className="text-center py-6">Your teacher hasn't added anything for you yet.</td></tr>
                  )}
                  {!loading && !error && subjects.length > 0 && subjects.map((subject, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-4 px-2 sm:px-4 md:px-6 text-left whitespace-nowrap">
                        {subject.name}
                      </td>
                      <td className="py-4 px-2 sm:px-4 md:px-6 text-left whitespace-nowrap">
                        {subject.form.join(', ')}
                      </td>
                      <td className="py-4 px-2 sm:px-4 md:px-6 text-left whitespace-nowrap">
                        {subject.studentCount}
                      </td>
                      <td className="py-4 px-2 sm:px-4 md:px-6 text-left whitespace-nowrap">
                        {subject.termMark}
                      </td>
                      <td className="py-4 px-2 sm:px-4 md:px-6 text-left whitespace-nowrap">
                        {subject.files.map((file, fileIndex) => (
                          <Card key={fileIndex} className="mb-2 bg-white">
                            <p className="font-semibold">{file.title}</p>
                            <a href={file.filePath} className="text-gray-800 hover:underline">{file.filePath}</a>
                            <p className="text-gray-600">Added: {file.dateAdded}</p>
                            <p className="text-gray-600">Due: {file.dueDate}</p>
                          </Card>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
