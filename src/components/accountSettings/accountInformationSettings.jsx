import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../../production/zustand/auth/authStore";

function AccountInformationSettings() {
  //hooks
  const [showSavedModal, setShowSavedModal] = useState(false);
  const handleSave = () => {
    setShowSavedModal(true);
  };
  const handleCloseSavedModal = () => {
    setShowSavedModal(false);
  };

  const { student } = useAuthStore();

  useEffect(() => {
    console.log(student + "New data");
  }, [student]);

  return (
    <div className="bg-white text-gray-800">
      <div className="px-4 py-4 md:px-8 font-mainFont">
        <div className="flow-root">
          <div className="-my-6 divide-y divide-gray-300 relative overflow-hidden bg-gray-100 shadow-xl rounded-xl px-4 md:px-6">
            <div>
              <div className="mt-2">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  Account Information
                </h3>
              </div>

              <div className="mt-4 mb-2">
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-800 font-pj"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <h1
                          className="block w-full py-4 pl-2 text-gray-800 placeholder-gray-500 bg-gray-200 rounded-xl"
                        >
                          {student ? student.name : "Loading..."}
                        </h1>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="studentID"
                        className="text-base font-medium text-gray-800 font-pj"
                      >
                        Student ID{" "}
                      </label>
                      <div className="mt-2">
                        <h1
                          className="block w-full py-4 pl-2 text-gray-800 placeholder-gray-500 bg-gray-200 rounded-xl"
                        >
                          {student ? student.studentId : "Loading..."}
                        </h1>
                      </div>
                    </div>

                    {/* national id and phone number */}
                    <div className="...">
                      <div>
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-800 font-pj"
                        >
                          National ID
                        </label>
                        <div className="mt-2">
                          <h1
                            className="block w-full py-4 pl-2 text-gray-800 placeholder-gray-500 bg-gray-200 rounded-xl"
                          >
                            {student ? student.email : "Loading..."}
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor=""
                        className="text-base font-medium text-gray-800 font-pj"
                      >
                        Current Year
                      </label>
                      <h1
                        style={{ width: "50vh" }}
                        className="block w-full py-4 pl-2 text-gray-800 placeholder-gray-500 bg-gray-200 rounded-xl"
                      >
                        {student ? student.level : "Loading..."}
                      </h1>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      {
                        <label
                          htmlFor=""
                          className="text-base font-medium text-gray-800 font-pj"
                        >
                          Parent or Guardian{" "}
                        </label>
                      }
                      <div className="mt-2 relative">
                        <input
                          type="text"
                          name=""
                          placeholder={student ? student.parentGuardianInfo.name : "Loading..."}
                          className="block w-full py-4  text-gray-800 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-xl focus:border-gray-800 focus:ring-gray-800 caret-gray-800 "
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="GuardianPhoneNumber"
                        className="text-base font-medium text-gray-800 font-pj"
                      >
                        Parent or Guardian Mobile
                      </label>
                      <div className="mt-2 relative">
                        <div className="absolute inset-y-0 left-0 flex items-center">
                          <label htmlFor="" className="sr-only">
                            {" "}
                            Country code{" "}
                          </label>
                          <select className="h-full py-0 pl-3 pr-2 text-gray-800 bg-gray-200 border border-gray-300 rounded-none rounded-l-lg focus:border-gray-800 focus:ring-gray-800 caret-gray-800 sm:text-sm">
                            <option>+263</option>
                          </select>
                        </div>

                        <input
                          type="tel"
                          name="GuardianPhoneNumber"
                          id="GuradianPhoneNumber"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder={student ? student.parentGuardianInfo.phoneNumber : "Loading..."}
                          className="block w-full py-4 pl-24 text-gray-800 placeholder-gray-500 bg-gray-200 border border-gray-300 rounded-xl focus:border-gray-800 focus:ring-gray-800 caret-gray-800 "
                        />
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-gray-800 transition-all duration-200
                      bg-blue-500 hover:bg-blue-400 rounded-md"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* save changes modal */}
      {showSavedModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
          <div className="absolute z-10 bg-white max-w-sm overflow-hidden shadow-lg rounded-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="absolute top-0 right-0 pt-3 pr-3">
              <button
                type="button"
                className="p-1 text-gray-800 transition-all duration-200 bg-gray-200 rounded-md hover:bg-gray-300 hover:text-gray-800"
                onClick={handleCloseSavedModal}
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

            <div className="p-8">
              <div className="text-center">
                <p className="mt-4 text-xl font-bold text-gray-800">
                  Changes successfully saved
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
                        onClick={handleCloseSavedModal}
                        className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-gray-800 transition-all duration-200 bg-red-300 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-red-200"
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
      {/* end save changes modal */}
    </div>
  );
}

export default AccountInformationSettings;
