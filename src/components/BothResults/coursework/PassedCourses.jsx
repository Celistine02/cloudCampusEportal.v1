import { useState, useEffect } from "react";
import useSubjectStore from './../../../../production/zustand/features/subjects/subjectStore';

const PassedCourses = () => {
  const [displayedCoursework, setDisplayedCoursework] = useState(7);
  const [selectedTerm, setSelectedTerm] = useState("term3");
  const [selectedYear, setSelectedYear] = useState("all");
  const { subjects, fetchSubjects } = useSubjectStore();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const loadMoreCoursework = () => {
    setDisplayedCoursework((prevCount) => prevCount + 8);
  };

  const passedCourseWorkData = subjects.flatMap(subject =>
    (subject.courseworkMarks || [])
      .filter(coursework => coursework.mark >= 50)
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
        status: "Pass",
        statusSVG: (
          <svg
            className="mr-1.5 h-2.5 w-2.5 text-blue-500"
            fill="currentColor"
            viewBox="0 0 8 8"
          >
            <circle cx="4" cy="4" r="3" />
          </svg>
        ),
      }))
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-end space-x-4">
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
      {passedCourseWorkData.length === 0 ? (
        <div className="text-center text-gray-600 py-4">
          No results to show yet
        </div>
      ) : (
        <div className="flex flex-col mt-4 lg:mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                <thead className="bg-gray-200 text-gray-600 uppercase text-xs md:text-sm leading-normal">
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
                <tbody className="text-gray-600 text-xs md:text-sm font-light">
                  {passedCourseWorkData
                    .slice(0, displayedCoursework)
                    .map((rowData, index) => (
                      <tr key={index} className="border-b border-gray-200 ">
                        <td className="py-2 px-4 md:py-3 md:px-6 text-left whitespace-nowrap">
                          {rowData.classItem}
                        </td>
                        <td className="py-2 px-4 md:py-3 md:px-6 text-left whitespace-nowrap">
                          {rowData.assessmentType}
                        </td>
                        <td className="py-2 px-4 md:py-3 md:px-6 text-left whitespace-nowrap">
                          {rowData.date}
                        </td>
                        <td className="py-2 px-4 md:py-3 md:px-6 text-left whitespace-nowrap">
                          {rowData.mark}
                        </td>
                        <td>
                          <div className="inline-flex items-center">
                            {rowData.statusSVG}
                            {rowData.status}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {displayedCoursework < passedCourseWorkData.length && (
                <div className="flex justify-center mt-4">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-black rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={loadMoreCoursework}
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PassedCourses;
