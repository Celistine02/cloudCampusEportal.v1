import { useState } from "react";

const InsightsTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("myclasses");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="bg-white text-black">
      <div className="px-4 mx-auto max-w-full font-mainFont">
        <p className="text-left font-bold text-xl pb-2 underline">
          Latest Insights
        </p>
        <nav className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-center">
          <div
            className={`cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === "myclasses"
                ? "text-blue-500 bg-blue-200"
                : "text-gray-700 hover:text-gray-800"
            } transition-all duration-200 rounded-lg group whitespace-nowrap`}
            onClick={() => handleTabClick("myclasses")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="cursor-pointer -ml-0.5 mr-2 group-hover:text-gray-800 h-5 w-5 transition-all duration-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            My Classes
          </div>

          <div
            className={`cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === "activities"
                ? "text-blue-500 bg-blue-200"
                : "text-gray-700 hover:text-gray-800"
            } transition-all duration-200 rounded-lg group whitespace-nowrap`}
            onClick={() => handleTabClick("activities")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="-ml-0.5 mr-2 group-hover:text-gray-800 h-5 w-5 transition-all duration-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
              />
            </svg>
            My Activities
          </div>

          <div
            className={`cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === "teachers"
                ? "text-blue-500 bg-blue-200"
                : "text-gray-700 hover:text-gray-800"
            } transition-all duration-200 rounded-lg group whitespace-nowrap`}
            onClick={() => handleTabClick("teachers")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="cursor-pointer -ml-0.5 mr-2 group-hover:text-gray-800 h-5 w-5 transition-all duration-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            My Teachers
          </div>

          <div
            className={`cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium ${
              activeTab === "more"
                ? "text-blue-500 bg-blue-200"
                : "text-gray-700 hover:text-gray-800"
            } transition-all duration-200 rounded-lg group whitespace-nowrap`}
            onClick={() => handleTabClick("more")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="cursor-pointer -ml-0.5 mr-2 group-hover:text-gray-800 h-5 w-5 transition-all duration-100"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            More
          </div>
        </nav>
      </div>
    </div>
  );
};

export default InsightsTabs;
