import { useState } from "react";
import { FaUser } from "react-icons/fa6";
import AccountInformationSettings from "../accountSettings/accountInformationSettings";
import { useMediaQuery } from '@mui/material';

const MyProfileButton = () => {
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleShowAddAgentModal = () => {
    setShowAddAgentModal(true);
  };

  const handleCloseAddAgentModal = () => setShowAddAgentModal(false);

  return (
    <div>
      <div className="mx-4 font-mainFont">
        <button
          onClick={handleShowAddAgentModal}
          type="button"
          className="inline-flex items-center gap-3 justify-center w-full px-4 py-3 text-sm font-semibold leading-5 text-black transition-all 
        duration-200  bg-white border border-gray-300 rounded hover:bg-gray-100 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        >
          <FaUser />
          {isMobile ? "Profile" : "Tanaka Gurure"}
        </button>

      </div>
      {/* Personal Details modal */}
      {showAddAgentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
          <div className={`relative z-20 bg-white max-w-md overflow-hidden shadow-lg rounded-xl transform transition-all ${isMobile ? 'w-full h-full' : 'sm:max-w-[60%] sm:w-full'}`}>
            <div className="absolute top-0 right-0 pt-3 pr-3">
              <button
                type="button"
                className="p-1 text-gray-500 transition-all duration-200 bg-white rounded-md hover:bg-gray-200 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                onClick={handleCloseAddAgentModal}
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
            <div className="flex items-center justify-center w-full h-full px-4 py-5 sm:p-6">
              <AccountInformationSettings />
            </div>
          </div>
        </div>
      )}
      {/* Personal Details modal*/}
    </div>
  );
};

export default MyProfileButton;
