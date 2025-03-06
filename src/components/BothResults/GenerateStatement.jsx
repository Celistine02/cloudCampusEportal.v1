import React from "react";
import { FaFilePdf } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useSubjectStore from "./../../../production/zustand/features/subjects/subjectStore";

const GenerateStatement = ({
  handleShowGenerateModal,
  handleCloseSentToEmailModal,
  showGenerateModal,
  handleCloseGenerateModal,
  showSentToEmailModal,
}) => {
  const { subjects } = useSubjectStore();

  const downloadStatement = () => {
    const statementData = subjects.map(subject => ({
      ...subject,
      status: "Not yet graded"
    }));

    const blob = new Blob([JSON.stringify(statementData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'statement.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {/* Generate Statement Modal */}
      <div className="mt-1">
        <div>
          <div className="py-3 font-pj text-center">
            <span onClick={downloadStatement}>
              <Link className="inline-flex items-center justify-center w-full px-2 py-3 gap-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-blue-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-gray-300">
                Download <FaFilePdf />{" "}
              </Link>
            </span>
          </div>
        </div>
      </div>
      {/* generate statement modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white w-full max-w-sm overflow-hidden shadow-lg rounded-xl transform transition-all sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <div className="absolute top-0 right-0 pt-3 pr-3">
              <button
                type="button"
                className="p-1 text-gray-600 transition-all duration-200 bg-gray-300 rounded-md hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={handleCloseGenerateModal}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-8">
              <div className="text-center">
                <p className="mt-4 text-xl font-bold text-gray-800">
                  Request Transactions Statement
                </p>
                <p className="mt-3 text-base font-medium text-gray-600">
                  Your statement will be sent via email shortly after your
                  confirmation.
                </p>

                {/* mail icon */}
                <div className="mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto text-gray-800 animate-bounce mt-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleShowGenerateModal}
                    className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-800 transition-all duration-200 bg-green-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-green-400"
                  >
                    Send to Email
                  </button>
                  <div className="mt-2">
                    <Link>
                      <button
                        type="button"
                        onClick={handleCloseGenerateModal}
                        className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-800 transition-all duration-200 bg-red-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-red-400"
                      >
                        Cancel Request
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* sent to email modal */}
      {showSentToEmailModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
          <div className="relative z-10 bg-white w-full max-w-sm overflow-hidden shadow-lg rounded-xl transform transition-all sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            <div className="absolute top-0 right-0 pt-3 pr-3">
              <button
                type="button"
                className="p-1 text-gray-600 transition-all duration-200 bg-gray-300 rounded-md hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={handleCloseSentToEmailModal}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 sm:p-8">
              <div className="text-center">
                <p className="mt-4 text-xl font-bold text-gray-800">
                  Successfully Downloaded Report
                </p>

                {/* checkmark icon */}
                <div className="mt-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto text-gray-800 animate-bounce mt-10"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>

                <div className="mt-4">
                  <div className="mt-2">
                    <Link>
                      <button
                        type="button"
                        onClick={handleCloseSentToEmailModal}
                        className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-800 transition-all duration-200 bg-red-500 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 hover:bg-red-400"
                      >
                        Close
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateStatement;
