import {useState} from "react";

import Insights from "./Insights";
import InsightsTabs from './InsightsTabs'
import Activities from "./Activities";
import Teachers from "./Teachers";
import MyClasses from "./MyClasses";
import More from "./more";

function MainDashboardArea() {
  const [activeTab, setActiveTab] = useState("myclasses");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-light text-dark min-h-screen">
      {/* <div className="font-mainFont">
        <h3 className="text-center font-bold text-2xl pt-2 sm:text-3xl md:text-4xl lg:text-5xl">Sakiso Stream</h3>
      </div> */}

      <Insights/>
      <InsightsTabs onTabChange={handleTabChange} />
      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        {activeTab === "myclasses" ? <MyClasses />
        : activeTab === "activities" ? <Activities />
        : activeTab === "teachers" ? <Teachers />
        : <More/>}
      </div>
    </div>
  );
}

export default MainDashboardArea;
