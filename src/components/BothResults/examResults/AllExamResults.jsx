import { useState, useEffect } from "react";
import { useMediaQuery } from '@mui/material';
import useSubjectStore from "../../../../production/zustand/features/subjects/subjectStore";

const AllExamResults = () => {
  // State to track number of Results displayed
  const [displayedResults, setDisplayedResults] = useState(7);
  const { subjects, fetchSubjects } = useSubjectStore();

  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px)');

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Function to load more Results
  const loadMoreResults = () => {
    // Increase the number of displayed Results by 8
    setDisplayedResults((prevCount) => prevCount + 8);
  };

  return (
    <div className={`bg-white text-gray-800 p-4 ${isMobile ? 'text-sm' : isTablet ? 'text-base' : 'text-lg'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label htmlFor="term" className="text-sm font-medium text-gray-600 pr-2">
            Term:
          </label>
          <select
            id="term"
            name="term"
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-600 mr-4"
          >
            <option>Term 1</option>
            <option>Term 2</option>
            <option>Term 3</option>
          </select>
          <label htmlFor="year" className="text-sm font-medium text-gray-600 pr-2">
            Year:
          </label>
          <select
            id="year"
            name="year"
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-600"
          >
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="sort" className="text-sm font-medium text-gray-600 pr-2">
            Sort:
          </label>
          <select
            id="sort"
            name="sort"
            className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-600"
          >
            <option>Grade</option>
            <option>Subject Name</option>
          </select>
        </div>
      </div>
      {/* table of Results by agent */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          {/* table titles */}
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">
                <div className="flex items-center">Class Name</div>
              </th>
              <th className="py-3 px-6 text-left">
                <div className="flex items-center">Grade</div>
              </th>
              <th className="py-3 px-6 text-left">
                <div className="flex items-center">Mark</div>
              </th>
              <th className="py-3 px-6 text-left">
                <div className="flex items-center">Status</div>
              </th>
              <th className="py-3 px-6 text-left">
                <div className="flex items-center">Class Teacher</div>
              </th>
            </tr>
          </thead>

          {/* table body */}
          <tbody className="text-gray-600 text-sm font-light">
            {subjects
              .slice(0, displayedResults)
              .map((subject, index) => (
                <tr key={index} className="border-b border-gray-300 ">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {subject.name}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Not yet graded
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    Not yet graded
                  </td>
                  <td>
                    <div className="inline-flex items-center">
                      <svg
                        className="mr-1.5 h-2.5 w-2.5 text-blue-500"
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      Not yet graded
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {subject.teacherName}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Show more button */}
      {displayedResults < subjects.length && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
            onClick={loadMoreResults}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllExamResults;
