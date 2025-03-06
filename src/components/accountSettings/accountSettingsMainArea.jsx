import React from "react";
import SettingsTabs from "./settingsTabs";
const accountSettingsMainArea = () => {
  return (
    <div className="bg-white text-black">
      
      <div className="font-mainFont">
        <h3 className="text-center font-bold text-3xl pt-2 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">Account Settings</h3>
      </div>
      <SettingsTabs />
    </div>
  );
};

export default accountSettingsMainArea;
