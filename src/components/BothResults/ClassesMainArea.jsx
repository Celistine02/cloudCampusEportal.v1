import { useState } from "react";
import Tabs from "./Tabs";
import ExaminationResultsMainArea from "./examResults/ExaminationResultsMainArea";
import CourseWork from "./coursework/CourseWorkMainArea";
import GenerateStatement from "./GenerateStatement";


const ClassesMainArea = () => {
  const [activeTab, setActiveTab] = useState("examinations");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showSentToEmailModal, setShowSentToEmailModal] = useState(false);
  //const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleShowGenerateModal = () => {
    // Handle generate statement logic
    setShowSentToEmailModal(true);
    setShowGenerateModal(false);
  };

  const handleCloseGenerateModal = () => {
    setShowGenerateModal(false);
  };

  const handleCloseSentToEmailModal = () => {
    setShowSentToEmailModal(false);
  };

  return (
    <div className="bg-white text-gray-800">
      <div className={showGenerateModal ? "filter blur-sm" : ""}>
        <h3 className="text-center font-bold text-3xl pt-2 text-gray-800">
          All Classes Results
        </h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-9">
          {/* table under tabs */}
          <Tabs onTabChange={handleTabChange} />
          {activeTab === "examinations" ? <ExaminationResultsMainArea /> : <CourseWork />}
        </div>
        {/* end tabs */}
        <div className="col-span-12 lg:col-span-3 pt-8 lg:pt-32">
          
          <GenerateStatement
            showGenerateModal={showGenerateModal}
            showSentToEmailModal={showSentToEmailModal}
            handleShowGenerateModal={handleShowGenerateModal}
            handleCloseSentToEmailModal={handleCloseSentToEmailModal}
            handleCloseGenerateModal={handleCloseGenerateModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassesMainArea;
