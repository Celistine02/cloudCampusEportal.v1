import { useState } from "react";
import WithdrawalsTabs from "./CourseWorkTabs";
import AllCourseWork from "./AllCourseWork";
import PassedCourses from "./PassedCourses";
import Failed from "./Failed";
import CanceledWithdrawals from "./CanceledWithdrawals";
const CourseWork = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  
  //end depots array
  return (
    <div className="bg-white text-black">
      {/* table of CourseWork transactions */}

      <div className="py-2 sm:py-8 lg:py-4">
        <div className="px-2 mx-auto max-w-full sm:px-4 lg:px-6 xl:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black">Coursework</p>
          </div>
          {/* tabs under CourseWork */}
          <div>
            <WithdrawalsTabs onTabChange={handleTabChange} />

            {activeTab === "all" ? (
              <AllCourseWork />
            ) : activeTab === "passed" ? (
              <PassedCourses />
            ) : activeTab === "failed" ? (
              <Failed />
            ) : (
              <CanceledWithdrawals />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseWork;
