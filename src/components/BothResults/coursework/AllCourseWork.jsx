import { useState, useEffect } from "react";
import { useMediaQuery } from '@mui/material';
import useSubjectStore from './../../../../production/zustand/features/subjects/subjectStore';

const AllCourseWork = () => {
  // State to track number of CourseWork displayed
  const [displayedCourseWork, setDisplayedCourseWork] = useState(7);
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px)');
  const { subjects, fetchSubjects } = useSubjectStore();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  // Function to load more CourseWork
  const loadMoreCourseWork = () => {
    // Increase the number of displayed CourseWork by 8
    setDisplayedCourseWork((prevCount) => prevCount + 8);
  };

  const courseworkMarks = subjects.flatMap(subject => subject.courseworkMarks ? subject.courseworkMarks : []);

  const filteredCourseworkMarks = courseworkMarks.filter(coursework => {
    const termMatch = selectedTerm === "all" || coursework.term === selectedTerm;
    const yearMatch = selectedYear === "all" || coursework.year === selectedYear;
    return termMatch && yearMatch;
  });

  return (
    <div className="bg-white text-gray-800">
      <div className="flex items-center justify-end space-x-4">
        <label htmlFor="term" className="text-sm font-medium text-gray-600">
          Term:
        </label>
        <select
          id="term"
          name="term"
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-800"
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
        >
          <option value="all">All</option>
          <option value="term1">Term 1</option>
          <option value="term2">Term 2</option>
          <option value="term3">Term 3</option>
        </select>

        <label htmlFor="year" className="text-sm font-medium text-gray-600">
          Year:
        </label>
        <select
          id="year"
          name="year"
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-800"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="all">All</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>

        <label htmlFor="sort" className="text-sm font-medium text-gray-600">
          Sort:
        </label>
        <select
          id="sort"
          name="sort"
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-800"
        >
          <option>Date</option>
        </select>
      </div>
      {/* table of CourseWork by agent */}
      <div className="flex flex-col mt-4 lg:mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
            {/* table */}
            <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              {/* table titles */}
              <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <tr>
                  <th className="py-3 px-6 text-left">
                    <div className="flex items-center">Class Name</div>
                  </th>

                  <th className="py-3 px-6 text-left">
                    <div className="flex items-center">Assesment Type</div>
                  </th>

                  <th className="py-3 px-6 text-left">
                    <div className="flex items-center">Date</div>
                  </th>

                  <th className="py-3 px-6 text-left">
                    <div className="flex items-center">Mark</div>
                  </th>

                  <th className="py-3 px-6 text-left">
                    <div className="flex items-center">Status</div>
                  </th>
                </tr>
              </thead>

              {/* table body */}
              <tbody className="text-gray-600 text-sm font-light">
                {filteredCourseworkMarks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-3 px-6 text-center">
                      No results yet
                    </td>
                  </tr>
                ) : (
                  filteredCourseworkMarks.slice(0, displayedCourseWork).map((coursework, index) => (
                    <tr key={index} className="border-b border-gray-300 ">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {coursework?.classItem || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {coursework?.assessmentType || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {coursework?.date || 'N/A'}
                      </td>
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        {coursework?.mark || 'N/A'}
                      </td>
                      <td>
                        <div className="inline-flex items-center">
                          {coursework?.statusSVG || null}
                          {coursework?.status || 'N/A'}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {/* Show more button */}
            {displayedCourseWork < filteredCourseworkMarks.length && (
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                  onClick={loadMoreCourseWork}
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourseWork;
