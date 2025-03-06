import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSubjectStore from "./../../../../production/zustand/features/subjects/subjectStore";
import useAuthStore from "./../../../../production/zustand/auth/authStore";

const MyClasses = () => {
  const { subjects, fetchSubjects, loading, error } = useSubjectStore();
  const { student } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const filteredSubjects = subjects.filter(subject => subject.form.includes(student.level));

  return (
    <div className="py-4 sm:py-4 font-mainFont bg-white text-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-black">Subjects Brief</p>
          </div>

          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => navigate("/my-portal/student/studynotes")}
              className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-600 uppercase hover:text-black"
            >
              See all classes
              <svg
                className="w-4 h-4 ml-2"
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
            </button>
          </div>
        </div>

        {/* table of deposits by agent */}
        <div className="flex flex-col mt-4 lg:mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
              {/* table */}
              <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                {/* table titles */}
                <thead className="bg-gray-200 text-black uppercase text-xs sm:text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-2 sm:px-6 text-left">
                      <div className="flex items-center">Class Name</div>
                    </th>

                    <th className="py-3 px-2 sm:px-6 text-left">
                      <div className="flex items-center">Form</div>
                    </th>

                    <th className="py-3 px-2 sm:px-6 text-left">
                      <div className="flex items-center">Student Count</div>
                    </th>

                    <th className="py-3 px-2 sm:px-6 text-left">
                      <div className="flex items-center">Term Mark</div>
                    </th>

                    <th className="py-3 px-2 sm:px-6 text-left">
                      <div className="flex items-center">Files</div>
                    </th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody className="text-black text-xs sm:text-sm font-medium">
                  {loading && <tr><td colSpan="5" className="text-center py-3">Loading...</td></tr>}
                  {error && <tr><td colSpan="5" className="text-center py-3">Error: {error}</td></tr>}
                  {!loading && !error && filteredSubjects.length === 0 && (
                    <tr><td colSpan="5" className="text-center py-3">Your teacher hasn't added anything for you yet.</td></tr>
                  )}
                  {!loading && !error && filteredSubjects.length > 0 && filteredSubjects.map((subject, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">
                        {subject.name}
                      </td>
                      <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">
                        {student.level}
                      </td>
                      <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">
                        {subject.studentCount}
                      </td>
                      <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">
                        {subject.termMark}
                      </td>
                      <td className="py-3 px-2 sm:px-6 text-left whitespace-nowrap">
                        {subject.files.map((file, fileIndex) => (
                          <div key={fileIndex} className="flex flex-col sm:flex-row sm:items-center">
                            <p className="sm:mr-2">{file.title}</p>
                            <p className="sm:mr-2">{file.filePath}</p>
                            <p className="sm:mr-2">{file.dateAdded}</p>
                            <p className="sm:mr-2">{file.dueDate}</p>
                          </div>
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
