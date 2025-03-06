import { useState, useEffect } from "react";
import useSubjectStore from './../../../../production/zustand/features/subjects/subjectStore';

const Failed = () => {
  const [displayedCourseWork, setDisplayedCourseWork] = useState(7);
  const [selectedTerm, setSelectedTerm] = useState("term3");
  const [selectedYear, setSelectedYear] = useState("all");
  const { subjects, fetchSubjects } = useSubjectStore();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const loadMoreCourseWork = () => {
    setDisplayedCourseWork((prevCount) => prevCount + 8);
  };

  const failedCourseWorkData = subjects.flatMap(subject =>
    (subject.courseworkMarks || [])
      .filter(coursework => coursework.mark < 50)
      .filter(coursework => {
        const termMatch = coursework.term === "term3";
        const yearMatch = selectedYear === "all" || coursework.year === selectedYear;
        return termMatch && yearMatch;
      })
      .map(coursework => ({
        classItem: subject.name,
        assessmentType: coursework.assessmentType,
        date: coursework.date,
        mark: coursework.mark,
        status: "Fail",
        statusSVG: (
          <svg
            className="mr-1.5 h-2.5 w-2.5 text-red-500"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" r="3" />
          </svg>
        ),
      }))
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-wrap items-center justify-end space-x-4">
        <label htmlFor="term" className="text-sm font-medium text-gray-600">
          Term:
        </label>
        <select
          id="term"
          name="term"
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-800"
          disabled
        >
          <option value="term3">Term 3</option>
        </select>

        <label htmlFor="year" className="text-sm font-medium text-gray-600">
          Year:
        </label>
        <select
          id="year"
          name="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-800"
        >
          <option value="all">All</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>
      </div>
      {failedCourseWorkData.length === 0 ? (
        <div className="text-center text-gray-600 py-4">
          No results to show yet
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg text-gray-900">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs md:text-sm leading-normal">
              <tr>
                <th className="py-2 px-4 md:py-3 md:px-6 text-left">
                  <div className="flex items-center">Class Name</div>
                </th>
                <th className="py-2 px-4 md:py-3 md:px-6 text-left">
                  <div className="flex items-center">Assessment Type</div>
                </th>
                <th className="py-2 px-4 md:py-3 md:px-6 text-left">
                  <div className="flex items-center">Date</div>
                </th>
                <th className="py-2 px-4 md:py-3 md:px-6 text-left">
                  <div className="flex items-center">Mark</div>
                </th>
                <th className="py-2 px-4 md:py-3 md:px-6 text-left">
                  <div className="flex items-center">Status</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-xs md:text-sm font-light">
              {failedCourseWorkData.slice(0, displayedCourseWork).map((course, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-2 px-4 md:py-3 md:px-6 text-left whitespace-nowrap">
                    {course.classItem}
                  </td>
                  <td className="py-2 px-4 md:py-3 md:px-6 text-left whitespace-nowrap">
                    {course.assessmentType}
                  </td>
                  <td className="py-2 px-4 md:py-3 md:px-6 text-left whitespace-nowrap">
                    {course.date}
                  </td>
                  <td className="py-2 px-4 md:py-3 md:px-6 text-left whitespace-nowrap">
                    {course.mark}
                  </td>
                  <td>
                    <div className="inline-flex items-center">
                      {course.statusSVG}
                      {course.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {displayedCourseWork < failedCourseWorkData.length && (
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 text-xs md:text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={loadMoreCourseWork}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Failed;
