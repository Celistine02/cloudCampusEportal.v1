import { useEffect, useState } from 'react';
import useFeeStore from './../../../../production/zustand/features/fees/feeStore';
import useSubjectStore from './../../../../production/zustand/features/subjects/subjectStore';

const Insights = () => {
  const { fees, loading: feesLoading, error: feesError, getFeesByStudent } = useFeeStore();
  const { subjects, loading: subjectsLoading, error: subjectsError, fetchSubjects } = useSubjectStore();
  const [feesBalance, setFeesBalance] = useState(0);
  const [courseworkPercentage, setCourseworkPercentage] = useState(0);
  const [examinationPercentage, setExaminationPercentage] = useState(0);

  useEffect(() => {
    getFeesByStudent();
    fetchSubjects();
  }, [getFeesByStudent, fetchSubjects]);

  useEffect(() => {
    if (fees.length > 0) {
      setFeesBalance(fees[0].balance);
    }
  }, [fees]);

  useEffect(() => {
    if (subjects.length > 0) {
      const totalCourseworkMarks = subjects.reduce((acc, subject) => {
        const subjectCourseworkMarks = subject.courseworkMarks ? Array.from(subject.courseworkMarks.values()) : [];
        const subjectTotalMarks = subjectCourseworkMarks.reduce((sum, mark) => sum + mark, 0);
        return acc + subjectTotalMarks;
      }, 0);
      const totalSubjects = subjects.length;
      setCourseworkPercentage(totalSubjects ? (totalCourseworkMarks / totalSubjects) : 0);

      const totalExaminationMarks = subjects.reduce((acc, subject) => {
        const subjectExaminationMarks = subject.examMarks ? Array.from(subject.examMarks.values()) : [];
        const subjectTotalMarks = subjectExaminationMarks.reduce((sum, mark) => sum + mark, 0);
        return acc + subjectTotalMarks;
      }, 0);
      setExaminationPercentage(totalSubjects ? (totalExaminationMarks / totalSubjects) : 0);
    }
  }, [subjects]);

  return (
    <div>
      {/* Today's Insights */}
      <div className="py-8 bg-gray-100 sm:py-10 lg:py-6 font-mainFont">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white border border-gray-300 rounded-xl transition-transform hover:scale-105 duration-500">
              <div className="px-5 py-4">
                <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Fees Balance
                </p>
                <div className="flex items-center justify-between mt-3">
                  {feesLoading ? (
                    <p className="text-lg sm:text-xl font-bold text-gray-800 bg-red-200 p-2 rounded-md animate-pulse">Loading...</p>
                  ) : feesError ? (
                    <p className="text-lg sm:text-xl font-bold text-gray-800 bg-red-200 p-2 rounded-md animate-pulse">Error</p>
                  ) : (
                    <p className="text-lg sm:text-xl font-bold text-gray-800 bg-red-200 p-2 rounded-md animate-pulse">${feesBalance}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl transition-transform hover:scale-95 duration-500">
              <div className="px-5 py-4">
                <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Coursework
                </p>
                <div className="flex items-center justify-between mt-3">
                  {subjectsLoading ? (
                    <p className="text-lg sm:text-xl font-bold text-gray-800 bg-blue-200 p-2 rounded-md animate-pulse">Loading...</p>
                  ) : subjectsError ? (
                    <p className="text-lg sm:text-xl font-bold text-gray-800 bg-blue-200 p-2 rounded-md animate-pulse">Error</p>
                  ) : (
                    <p className="inline-flex items-center text-lg sm:text-xl font-bold text-blue-600">
                      + {courseworkPercentage}%
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 11l5-5m0 0l5 5m-5-5v12"
                        />
                      </svg>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl transition-transform hover:scale-105 duration-500">
              <div className="px-5 py-4">
                <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Examination
                </p>
                <div className="flex items-center justify-between mt-3">
                  {subjectsLoading ? (
                    <p className="text-lg sm:text-xl font-bold text-gray-800 bg-blue-200 p-2 rounded-md animate-pulse">Loading...</p>
                  ) : subjectsError ? (
                    <p className="text-lg sm:text-xl font-bold text-gray-800 bg-blue-200 p-2 rounded-md animate-pulse">Error</p>
                  ) : (
                    <p className="inline-flex items-center text-lg sm:text-xl font-bold text-blue-600">
                      + {examinationPercentage}%
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 ml-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 11l5-5m0 0l5 5m-5-5v12"
                        />
                      </svg>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl transition-transform hover:scale-95 duration-500">
              <div className="px-5 py-4">
                <p className="text-xs font-medium tracking-wider text-gray-600 uppercase">
                  Awards
                </p>
                <div className="flex items-center justify-between mt-3">
                  <p className="inline-flex items-center text-lg sm:text-xl font-bold text-blue-600">
                    0%
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 ml-0.5"
                      fill="none"
                      viewBox="0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 11l5-5m0 0l5 5m-5-5v12"
                      />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End of Today's Insights */}
    </div>
  );
};

export default Insights;
