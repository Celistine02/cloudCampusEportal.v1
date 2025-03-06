import { useState } from "react";
import ExamResultsTabs from "./ExamResultsTabs";
import AllExamResults from "./AllExamResults";
import PassedExamResults from "./PassedExamResults";
import PendingDeposits from "./PendingDeposits";
import CanceledDeposits from "./CanceledDeposits";
const ExaminationResultsMainArea = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  
  //end depots array
  return (
    <div className="bg-white text-gray-800">
      {/* table of deposits transactions */}

      <div className="py-2 sm:py-8 lg:py-4 xl:py-6 2xl:py-8">
        <div className="px-2 mx-auto max-w-full sm:px-4 lg:px-6 xl:px-8 2xl:px-10">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-gray-800">Examinations</p>
          </div>
          {/* tabs under deposits */}
          <div>
            <ExamResultsTabs onTabChange={handleTabChange} />

            {activeTab === "all" ? (
              <AllExamResults />
            ) : activeTab === "passed" ? (
              <PassedExamResults />
            ) : activeTab === "failed" ? (
              <PendingDeposits />
            ) : (
              <CanceledDeposits />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ExaminationResultsMainArea;
