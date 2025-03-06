import React, { useState } from "react";
import ActivityTable from "./activityTable";
import ManageActivityModal from "../../modals/manageActivityModal";
import useActivityStore from "./../../../../production/zustand/features/teachers/activitiesTeacher";

const ActivityMainArea = () => {
  const { activities, loading, error, createActivity, updateActivity, deleteActivity } = useActivityStore();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);

  const handleManageActivity = (activity) => {
    setSelectedActivity(activity);
    setShowManageModal(true);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
    setShowManageModal(false);
  };

  const handleFlagSuspicious = (activityId) => {
    // Implement flag suspicious activity logic here
  };

  const handleActivateAccount = (activityId) => {
    // Implement activate account logic here
  };

  const handleCloseAccount = (activityId) => {
    // Implement close account logic here
  };

  return (
    <div className="py-4 sm:py-4 bg-white text-black">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-black">Activities</h1>
        <p className="mt-2 text-base text-gray-600">
          Manage your activities and related tasks here.
        </p>
        <ActivityTable onManageActivity={handleManageActivity} />
        {showManageModal && (
          <ManageActivityModal
            show={showManageModal}
            onClose={handleCloseModal}
            selectedActivity={selectedActivity}
            onFlagSuspicious={handleFlagSuspicious}
            onActivateAccount={handleActivateAccount}
            onCloseAccount={handleCloseAccount}
          />
        )}
      </div>
    </div>
  );
};

export default ActivityMainArea;
