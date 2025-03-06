import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import useSubjectStore from './../../../../production/zustand/features/teachers/createSubjects';

const SubjectTable = () => {
  // State to track number of subjects displayed
  const [displayedSubjects, setDisplayedSubjects] = useState(8);
  const { subjects, loading, error, createSubject, getSubjectsByTeacher, deleteSubject } = useSubjectStore();
  const [showModal, setShowModal] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectForm, setSubjectForm] = useState([]);

  useEffect(() => {
    getSubjectsByTeacher();
  }, [getSubjectsByTeacher]);

  // Function to load more subjects
  const loadMoreSubjects = () => {
    // Increase the number of displayed subjects by 8
    setDisplayedSubjects((prevCount) => prevCount + 8);
  };

  // Function to add a new subject
  const addSubject = () => {
    if (subjectName && subjectForm.length > 0) {
      createSubject(subjectName, subjectForm);
      setShowModal(false);
      setSubjectName("");
      setSubjectForm([]);
    }
  };

  const handleFormChange = (event) => {
    const value = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSubjectForm(value);
  };

  return (
    <div className="py-4 sm:py-4 bg-gray-100 text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-gray-800">Subjects</p>
          </div>
          <div>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
              onClick={() => setShowModal(true)}
            >
              Add Subject
            </button>
          </div>
        </div>

        {loading && <p>Loading subjects...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && subjects.length === 0 && <p>No subjects available.</p>}
        {!loading && !error && subjects.length > 0 && (
          <div className="flex flex-col mt-4 lg:mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                {/* table */}
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                  {/* table titles */}
                  <thead className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Subject Name</div>
                      </th>

                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Form</div>
                      </th>

                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Teacher</div>
                      </th>

                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Student Count</div>
                      </th>

                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Action</div>
                      </th>
                    </tr>
                  </thead>

                  {/* table body */}
                  <tbody className="text-gray-800 text-sm font-light">
                    {subjects
                      .slice(0, displayedSubjects)
                      .map((subject, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-200">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {subject.name}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {subject.form ? subject.form.join(', ') : 'N/A'}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {subject.teacherId}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {subject.studentCount}
                          </td>
                          <td>
                            <div className="inline-flex items-center">
                              <FaTrash className="mr-1.5 h-2.5 w-2.5 text-gray-800" />
                              <button
                                className="text-gray-800"
                                onClick={() => deleteSubject(subject._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* Show more button */}
                {displayedSubjects < subjects.length && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
                      onClick={loadMoreSubjects}
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

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 backdrop-filter backdrop-blur-lg">
          <div className="flex items-center justify-center min-h-screen px-4 py-6">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Subject</h2>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Form</label>
                  <select
                    multiple
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={subjectForm}
                    onChange={handleFormChange}
                  >
                    <option value="form 1">Form 1</option>
                    <option value="form 2">Form 2</option>
                    <option value="form 3">Form 3</option>
                    <option value="form 4">Form 4</option>
                    <option value="form 5">Form 5</option>
                    <option value="form 6">Form 6</option>
                  </select>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="ml-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                    onClick={addSubject}
                  >
                    Add Subject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectTable;
