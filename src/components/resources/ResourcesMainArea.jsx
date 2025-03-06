import { useEffect } from "react";
import { Card } from "flowbite-react";
import { FaBook } from "react-icons/fa";
import ResourcesTable from "./ResourcesTable";
import useSubjectStore from './../../../production/zustand/features/subjects/subjectStore';

const ResourcesMainArea = () => {
  const { subjects, fetchSubjects, loading, error } = useSubjectStore();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return (
    <div className="py-4 sm:py-4 font-mainFont bg-gray-100 text-gray-800">
      <div className="px-4 mx-auto max-w-full sm:px-6 lg:px-8">
        {loading && <p>Loading subjects...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && subjects.length === 0 && <p>There is nothing at this time.</p>}
        <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {subjects.map((subject, index) => (
            <div key={index}>
              <Card className="cursor-pointer bg-gray-200 hover:bg-gray-300">
                <div className="flex flex-col items-center pb-10">
                  <FaBook className="text-4xl mb-4" />
                  <h5 className="mb-1 text-md font-medium text-gray-800">
                    {subject.name}
                  </h5>
                  <div className="inline-flex items-center">
                    <svg
                      className={`mr-1.5 h-2.5 w-2.5 text-${subject.color}-500`}
                      fill="currentColor"
                      viewBox="0 0 8 8"
                    >
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    <span className="text-sm text-gray-500">
                      {subject.status}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <ResourcesTable />
    </div>
  );
};

export default ResourcesMainArea;
