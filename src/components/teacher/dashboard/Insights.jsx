import { useEffect, useState } from 'react';
import useSubjectStore from './../../../../production/zustand/features/teachers/createSubjects';

const Insights = () => {
  const [passRate, setPassRate] = useState(85); // Dummy data for pass rate
  const [numberOfClasses, setNumberOfClasses] = useState(5); // Dummy data for number of classes
  const { subjectCount, getSubjectsByTeacher } = useSubjectStore(); // Get subject count and fetch function from the store
  const [attendanceScore, setAttendanceScore] = useState(95); // Dummy data for attendance score

  useEffect(() => {
    getSubjectsByTeacher(); // Fetch subjects when the component mounts
  }, [getSubjectsByTeacher]);

  return (
    <div>
      {/* Teacher's Insights */}
      <div className="py-8 bg-gray-100 sm:py-10 lg:py-6 font-mainFont">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white border border-gray-300 rounded-xl transition-transform hover:scale-105 duration-500">
              <div className="px-5 py-4">
                <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Pass Rate
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg sm:text-xl font-bold text-gray-800 bg-red-200 p-2 rounded-md animate-pulse">{passRate}%</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl transition-transform hover:scale-95 duration-500">
              <div className="px-5 py-4">
                <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Number of Classes
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg sm:text-xl font-bold text-blue-600">{numberOfClasses}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl transition-transform hover:scale-105 duration-500">
              <div className="px-5 py-4">
                <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Number of Subjects
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg sm:text-xl font-bold text-blue-600">{subjectCount}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl transition-transform hover:scale-105 duration-500">
              <div className="px-5 py-4">
                <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Attendance Score
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="text-lg sm:text-xl font-bold text-green-600">{attendanceScore}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Teacher's Insights */}
    </div>
  );
};

export default Insights;
