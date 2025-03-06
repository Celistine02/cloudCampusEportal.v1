import React, { useState } from "react";
import  useAuthStore  from "../../../production/zustand/auth/authStore";
import useTeacherStore from "../../../production/zustand/auth/teacherstore";
function LogoutHeader() {
  const [showModal, setShowModal] = useState(false);
  const { signout: authSignout } = useAuthStore();
  const { signout: teacherSignout } = useTeacherStore();

  const handleLogout = () => {
    authSignout();
    teacherSignout(); // This line will sign out the teacher from the teacher store
    window.location.reload(); // This line will reload the current page after logout
  };

  return (
    <div className="p-4">
      <div className="mt-5 border border-gray-500 rounded-lg bg-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mx-auto md:mx-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
              />
            </svg>

            <div className="flex-1 max-w-xs mt-4 md:mt-0 md:ml-6 text-center md:text-left">
              <p className="text-base font-bold text-gray-900">
                Proceed Logging Out
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Log out of your account easily.
              </p>
            </div>

            <div className="flex items-center justify-center mt-6 space-x-6 md:ml-auto md:justify-end md:mt-0 md:space-x-reverse">
              <button
                type="button"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 transition-all duration-200 bg-red-300 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-red-200"
                onClick={() => {
                  setShowModal(true);
                }}
              >
                LOG OUT
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent backdrop-filter backdrop-blur-sm">
          <div className="bg-white max-w-sm overflow-hidden shadow-lg rounded-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="px-4 py-6 text-center">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" />
              </svg>
              <p className="mt-5 text-xl font-bold text-gray-900">
                Account Logout
              </p>
              <p className="mt-3 text-sm font-medium text-gray-500">
                Are you sure you want to Log Out?
              </p>
              <div className="mt-4">
                <button
                  onClick={() => {
                    handleLogout();
                    setShowModal(false);
                  }}
                  className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-black border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-gray-700"
                >
                  Yes Log Me Out
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="mt-2 inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold leading-5 text-black transition-all duration-200 bg-red-500 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-red-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default LogoutHeader;
