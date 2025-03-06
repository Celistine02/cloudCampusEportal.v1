import { useState } from "react";
import useAuthStore from './../../../../production/zustand/auth/authStore';

const CanceledDeposits = () => {
  const { student } = useAuthStore();
  const [selectedTerm, setSelectedTerm] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  return (
    <section className="py-8 bg-white sm:py-12 lg:py-16">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-start lg:items-center">
            <svg
              className="flex-shrink-0 text-green-500 w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="mt-4 lg:mt-0 lg:ml-4 text-center lg:text-left">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                You haven't missed any exams!
              </h1>
              <p className="mt-2 text-sm font-normal text-gray-600">
                Congratulations on completing all your exams successfully.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-8 lg:grid-cols-5 lg:items-start xl:grid-cols-6 gap-y-10 lg:gap-x-12 xl:gap-x-16">
            <div className="pt-6 border-t border-gray-300 lg:col-span-3 xl:col-span-4">
              <a
                href="/my-portal/results"
                className="text-sm font-bold text-gray-600"
              >
                Exam Results
              </a>

              <div className="flow-root mt-8">
                <ul className="divide-y divide-gray-300 -my-7">
                  {/* Results removed as per instructions */}
                </ul>
              </div>

              <hr className="mt-6 border-gray-300" />

              <ul className="mt-6 space-y-4">
                {/* Results removed as per instructions */}
              </ul>
            </div>

            <div className="lg:col-span-2 lg:sticky lg:top-6">
              <div className="overflow-hidden rounded bg-gray-100">
                <div className="px-4 py-6 sm:p-6 lg:p-8">
                  <div className="space-y-9">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">
                        Student Information
                      </h3>
                      <p className="mt-4 text-sm font-medium text-gray-600">
                        {student.name}
                      </p>
                      <p className="mt-3 text-sm font-medium text-gray-600">
                        {student.parentGuardianInfo.phoneNumber}
                      </p>
                      <p className="mt-3 text-sm font-medium text-gray-600">
                        {student.email}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="term" className="text-sm font-medium text-gray-600 pr-2">
                        Term:
                      </label>
                      <select
                        id="term"
                        name="term"
                        value={selectedTerm}
                        onChange={(e) => setSelectedTerm(e.target.value)}
                        className="border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 bg-gray-200 text-gray-800 mr-4"
                      >
                        <option value="all">All</option>
                        <option value="term1">Term 1</option>
                        <option value="term2">Term 2</option>
                        <option value="term3">Term 3</option>
                      </select>

                      <label htmlFor="year" className="text-sm font-medium text-gray-600 pr-2">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CanceledDeposits;
