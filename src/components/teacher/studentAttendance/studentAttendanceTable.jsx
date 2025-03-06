import { useState, useEffect } from "react";
import useAttendanceStore from '../../../../production/zustand/features/studentAttendance/studentAttendanceStore';

const StudentAttendanceTable = ({ className }) => {
  // Fetch students for the specific class
  const { students, loading, error, fetchAttendanceList } = useAttendanceStore();

  useEffect(() => {
    fetchAttendanceList(className);
  }, [className, fetchAttendanceList]);

  // State to hold attendance status
  const [attendance, setAttendance] = useState({});

  // Handle attendance change for each student
  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  // Submit attendance
  const submitAttendance = () => {
    // Send the attendance data to the backend or Zustand store
    markAttendance(className, attendance);
  };

  return (
    <div className="py-4 sm:py-4 bg-gray-100 text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <p className="text-base font-bold text-gray-800">Attendance</p>

        {loading && <p>Loading students...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && students?.length === 0 && <p>No students available.</p>}
        {!loading && !error && students?.length > 0 && (
          <div className="flex flex-col mt-4 lg:mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-6 text-left">Student Name</th>
                      <th className="py-3 px-6 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 text-sm font-light">
                    {students?.map((student) => (
                      <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-200">
                        <td className="py-3 px-6 text-left whitespace-nowrap">{student.name}</td>
                        <td className="py-3 px-6 text-left">
                          <label className="mr-4">
                            <input
                              type="checkbox"
                              checked={attendance[student.id] === "present"}
                              onChange={() => handleAttendanceChange(student.id, "present")}
                              className="mr-2"
                            />
                            Present
                          </label>
                          <label>
                            <input
                              type="checkbox"
                              checked={attendance[student.id] === "absent"}
                              onChange={() => handleAttendanceChange(student.id, "absent")}
                              className="mr-2"
                            />
                            Absent
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-4">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
                    onClick={submitAttendance}
                  >
                    Submit Attendance
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentAttendanceTable;
