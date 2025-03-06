import React from "react";
import MyClasses from "./MyClasses";
import Students from "./Students";
import More from "./more";
import Insights from "./Insights";
import TimelineResource from "../../frontOffice/TimelineResource";

const DashboardMainArea = () => {
  return (
    <div className="flex flex-col w-full bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
          <Insights />
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
          <MyClasses />
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
          <TimelineResource />
        </div>
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 md:p-8 lg:p-10">
          <More />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainArea;
