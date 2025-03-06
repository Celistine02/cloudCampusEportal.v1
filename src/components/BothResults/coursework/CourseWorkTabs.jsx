import { useState } from "react";
import { useMediaQuery } from '@mui/material';

const CourseworkTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const isMobile = useMediaQuery('(max-width:768px)');
  const isTablet = useMediaQuery('(max-width:1024px)');
  const isLargeScreen = useMediaQuery('(min-width:1025px)');

  return (
    <div>
      <div className={`py-2 mx-auto max-w-full ${isMobile ? 'bg-gray-100' : isTablet ? 'bg-gray-200' : 'bg-gray-300'}`}>
        <nav className="flex flex-wrap space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row sm:items-center">
          <div
            className={`cursor-pointer inline-flex border border-2 items-center px-4 py-2 text-sm font-medium ${
              activeTab === "all"
                ? "text-black bg-gray-300"
                : "text-gray-600 hover:text-black"
            } transition-all duration-200 rounded-2xl group whitespace-nowrap`}
            onClick={() => handleTabClick("all")}
          >
            All
          </div>

          <div
            className={`cursor-pointer inline-flex border border-2 items-center px-4 py-2 text-sm font-medium ${
              activeTab === "passed"
                ? "text-black bg-gray-300"
                : "text-gray-600 hover:text-black"
            } transition-all duration-200 rounded-2xl group whitespace-nowrap`}
            onClick={() => handleTabClick("passed")}
          >
            Passed
          </div>

          <div
            className={`cursor-pointer inline-flex border border-2 items-center px-4 py-2 text-sm font-medium ${
              activeTab === "failed"
                ? "text-black bg-gray-300"
                : "text-gray-600 hover:text-black"
            } transition-all duration-200 rounded-2xl group whitespace-nowrap`}
            onClick={() => handleTabClick("failed")}
          >
            Failed
          </div>

          <div
            className={`cursor-pointer inline-flex border border-2 items-center px-4 py-2 text-sm font-medium ${
              activeTab === "missing"
                ? "text-black bg-gray-300"
                : "text-gray-600 hover:text-black"
            } transition-all duration-200 rounded-2xl group whitespace-nowrap`}
            onClick={() => handleTabClick("missing")}
          >
            Missing
          </div>
        </nav>
      </div>
      {/* <hr className="m"/> */}
    </div>
  );
};

export default CourseworkTabs;
