import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthStore from "../../../production/zustand/auth/authStore";

function SecurityandPasswordSettings() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  //hooks
  const [showUpdatedSettingsModal, setShowUpdatedModal] = useState(false);
  const handleUpdatedSettings = () => {
    setShowUpdatedModal(true);
  };
  const handleCloseUpdatedModal = () => {
    setShowUpdatedModal(false);
  };
  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const { student } = useAuthStore();
  const [studentEmail, setStudentEmail] = useState("");

  useEffect(() => {
    if (student && student.email) {
      setStudentEmail(student.email);
    }
  }, [student]);

  return (
    <div className="font-mainFont bg-white text-gray-900">
      <section className="px-4 sm:px-8 py-8 sm:py-16 lg:py-20">
        <div className="relative max-w-md mx-auto lg:max-w-lg">
          <div className="relative overflow-hidden bg-white shadow-xl rounded-xl w-full lg:w-[140%] h-full">
            <div className="px-2 sm:px-6">
              <div className="">
                <h3 className="text-xl pt-2 font-bold text-gray-900">
                  Security and Password
                </h3>
              </div>

              <form action="#" method="" className="mt-4 ">
                <div className="space-y-2">
                  <div className="">
                    {/* admin Email */}
                    <div className="">
                      <label
                        htmlFor="adminEmail"
                        className="text-base font-medium text-gray-900 font-pj"
                      >
                        Student Email
                      </label>
                      <div className="mt-3">
                        <input
                          type="email"
                          id="studentID"
                          name="studentID"
                          value={studentEmail}
                          placeholder="EF3008"
                          className="block w-full pl-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          required
                          readOnly
                        />
                      </div>
                    </div>
                    {/* old password field */}
                    <div className="mt-3">
                      <label
                        htmlFor="oldPassword"
                        className="text-base font-medium text-gray-900 font-pj"
                      >
                        Old Password
                      </label>
                      <div className="mt-3 relative">
                        <input
                          type={showOldPassword ? "text" : "password"}
                          id="oldPassword"
                          name="oldPassword"
                          placeholder="*************"
                          className="block w-full px-4 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          required
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={toggleOldPasswordVisibility}
                        >
                          {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* end first row in form */}

                  {/* second row in form */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* new password field */}
                    <div>
                      <label
                        htmlFor="newPassword"
                        className="text-base font-medium text-gray-900 font-pj"
                      >
                        New Password
                      </label>
                      <div className="mt-3 relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          id="newPassword"
                          name="newPassword"
                          placeholder="*************"
                          className="block w-full pl-4 pr-10 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          required
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={toggleNewPasswordVisibility}
                        >
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>

                    {/* confirm new password field */}
                    <div>
                      <label
                        htmlFor="confirmNewPassword"
                        className="text-base font-medium text-gray-900 font-pj"
                      >
                        Confirm New Password
                      </label>
                      <div className="mt-3 relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          placeholder="Re-enter new password"
                          className="block w-full pl-4 pr-10 py-4 text-gray-900 placeholder-gray-600 bg-white border border-gray-400 rounded-xl focus:border-gray-900 focus:ring-gray-900 caret-gray-900"
                          required
                        />
                        <span
                          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* end second row in form */}
                </div>
                {/* update admin settings button */}
                <div className="flex items-center justify-center pt-6">
                  <button
                    type="button"
                    onClick={handleUpdatedSettings}
                    className="inline-flex items-center justify-center w-full px-6 py-3 mb-4 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-blue-950 border border-gray-500 rounded-md hover:bg-blue-900"
                  >
                    Update Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* save update settings modal */}
      {showUpdatedSettingsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
          <div className="absolute z-10 bg-white max-w-sm overflow-hidden shadow-lg rounded-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="absolute top-0 right-0 pt-3 pr-3">
              <button
                type="button"
                className="p-1 text-gray-400 transition-all duration-200 bg-white rounded-md hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={handleCloseUpdatedModal}
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
              <div className="text-center ">
                <p className="mt-4 text-xl font-bold text-gray-900">
                  Settings successfully updated
                </p>

                {/* checkmark icon */}
                <div className="mt-4 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto text-gray-900 animate-bounce mt-10"
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
                        onClick={handleCloseUpdatedModal}
                        className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-black transition-all duration-200 bg-red-300 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-red-200"
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

export default SecurityandPasswordSettings;
