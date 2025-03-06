import { useState } from "react";

const Tabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("examinations");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-0">
        {/* examinations tab */}
        <div
          className={`cursor-pointer p-2 sm:p-4 m-2 sm:m-8 rounded text-sm font-bold ${
            activeTab === "examinations" ? "bg-blue-300 text-gray-900" : "text-blue-300 border border-blue-300"
          }`}
          onClick={() => handleTabClick("examinations")}
        >
          <div className="flex items-center justify-center space-x-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div>Examinations</div>
          </div>
        </div>

        {/* coursework */}
        <div
          className={`cursor-pointer p-2 sm:p-4 m-2 sm:m-8 rounded text-sm font-bold ${
            activeTab === "coursework" ? "bg-blue-300 text-gray-900" : "text-blue-300 border border-blue-300"
          }`}
          onClick={() => handleTabClick("coursework")}
        >
          <div className="flex items-center justify-center space-x-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div>Coursework</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
