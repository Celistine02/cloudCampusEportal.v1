import { useState } from "react";
const PassedExamResults = () => {
  // State to track number of Results displayed
  const [displayedResults, setDisplayedResults] = useState(7);

  // Function to load more Results
  const loadMoreResults = () => {
    // Increase the number of displayed Results by 8
    setDisplayedResults((prevCount) => prevCount + 8);
  };

  return (
    <div className="bg-white text-gray-800 p-4">
      <div className="flex items-center justify-end mb-4">
        <label htmlFor="sort" className="text-sm font-medium text-gray-600">
          {" "}
          Sort:{" "}
        </label>
        <select
          id="sort"
          name="sort"
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-white text-gray-800 ml-2"
        >
          <option>Grade</option>
          <option>Subject Name</option>
        </select>
      </div>
      <div className="flex items-center justify-end mb-4">
        <label htmlFor="term" className="text-sm font-medium text-gray-600">
          {" "}
          Term:{" "}
        </label>
        <select
          id="term"
          name="term"
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-white text-gray-800 ml-2"
        >
          <option>Term 1</option>
          <option>Term 2</option>
          <option>Term 3</option>
        </select>
      </div>
      <div className="flex items-center justify-end mb-4">
        <label htmlFor="year" className="text-sm font-medium text-gray-600">
          {" "}
          Year:{" "}
        </label>
        <select
          id="year"
          name="year"
          className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-white text-gray-800 ml-2"
        >
          <option>2021</option>
          <option>2022</option>
          <option>2023</option>
        </select>
      </div>
      {/* table of Results by agent */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
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
            <tr>
              <td colSpan="5" className="py-3 px-6 text-center">
                No exams to show yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassedExamResults;
