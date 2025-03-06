import { useState } from "react";

const ExamResultsTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div>
      <div className="py-2 mx-auto max-w-full bg-gray-200">
        <nav className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-center md:space-x-4 lg:space-x-6 xl:space-x-8">
          <div
            className={`cursor-pointer inline-flex border-2 items-center px-4 py-2 text-sm font-medium ${
              activeTab === "all"
                ? "text-black bg-gray-300"
                : "text-gray-600 hover:text-gray-800"
            } transition-all duration-200 rounded-2xl group whitespace-nowrap`}
            onClick={() => handleTabClick("all")}
          >
            All
          </div>

          <div
            className={`cursor-pointer inline-flex border-2 items-center px-4 py-2 text-sm font-medium ${
              activeTab === "passed"
                ? "text-black bg-gray-300"
                : "text-gray-600 hover:text-gray-800"
            } transition-all duration-200 rounded-2xl group whitespace-nowrap`}
            onClick={() => handleTabClick("passed")}
          >
            Passed
          </div>
          <div
            className={`cursor-pointer inline-flex border-2 items-center px-4 py-2 text-sm font-medium ${
              activeTab === "failed"
                ? "text-black bg-gray-300"
                : "text-gray-600 hover:text-gray-800"
            } transition-all duration-200 rounded-2xl group whitespace-nowrap`}
            onClick={() => handleTabClick("failed")}
          >
            Failed
          </div>

          <div
            className={`cursor-pointer inline-flex border-2 items-center px-4 py-2 text-sm font-medium ${
              activeTab === "missing"
                ? "text-black bg-gray-300"
                : "text-gray-600 hover:text-gray-800"
            } transition-all duration-200 rounded-2xl group whitespace-nowrap`}
            onClick={() => handleTabClick("missing")}
          >
            Missing
          </div>
        </nav>
      </div>
    </div>
  );
};

export default ExamResultsTabs;
