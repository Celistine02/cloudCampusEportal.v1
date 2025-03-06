import { FaUserTie } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import useActivityStore from "./../../../production/zustand/features/students/activity";

// ManageActivityModal Component
const ManageActivityModal = ({
  show,
  onClose,
  selectedActivity,
  onFlagSuspicious,
  onActivateAccount,
  onCloseAccount,
}) => {
  return (
    show && (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 bg-opacity-75 backdrop-filter backdrop-blur-lg">
        <div className="flex items-center justify-center min-h-screen px-4 py-6">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-8 text-center">
              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                Club Details
              </h2>
              <p className="mt-3 text-base font-medium text-gray-500">
                Manage the agent account details and settings below.
              </p>
              <div className="mt-6">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Club Profile"
                  className="mx-auto rounded-full shadow-md"
                />
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  {selectedActivity?.name || "Club Name"}
                </h3>
                <p className="text-sm text-gray-600">
                  Patron: <FaUserTie className="inline-block" /> Mr. John Doe
                </p>
                <p className="text-sm text-gray-600">
                  Subscription Fee: <MdAttachMoney className="inline-block" />{" "}
                  50/year
                </p>
              </div>
              <div className="flex justify-around mt-10 space-x-4">
                <button
                  type="button"
                  className="flex-1 py-3 text-sm font-semibold text-green-700 bg-green-200 border border-transparent rounded-md hover:text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
                  onClick={onActivateAccount}
                >
                  Register to Club
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 text-sm font-semibold text-red-700 bg-red-200 border border-transparent rounded-md hover:text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700"
                  onClick={onCloseAccount}
                >
                  Cancel Membership
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 text-sm font-semibold text-yellow-700 bg-yellow-200 border border-transparent rounded-md hover:text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-700"
                  onClick={onFlagSuspicious}
                >
                  Flag Suspicious
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 text-sm font-semibold text-gray-700 bg-gray-200 border border-transparent rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

// Activities Component
const Activities = () => {
  const [showManageActivityModal, setShowManageActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const { activities, getActivitiesByStudent, updateActivityStatus } = useActivityStore();

  useEffect(() => {
    getActivitiesByStudent();
  }, [getActivitiesByStudent]);

  const openManageActivityModal = (activity) => {
    setSelectedActivity(activity);
    setShowManageActivityModal(true);
  };

  const closeManageActivityModal = () => {
    setShowManageActivityModal(false);
  };

  const handleFlagSuspiciousActivity = () => {
    updateActivityStatus(selectedActivity.id, "Flagged", "yellow");
    closeManageActivityModal();
  };

  const handleActivateAgentAccount = () => {
    updateActivityStatus(selectedActivity.id, "Active", "green");
    closeManageActivityModal();
  };

  const handleCloseAgentAccount = () => {
    updateActivityStatus(selectedActivity.id, "Closed", "red");
    closeManageActivityModal();
  };

  return (
    <div className="py-4 sm:py-4 font-mainFont bg-gray-100 text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <p className="text-base font-bold text-gray-800">
            Extra-curricular Activities
          </p>
          <Link
            to="/admin/agents"
            className="mt-4 sm:mt-0 inline-flex items-center text-xs font-semibold tracking-widest text-gray-600 uppercase hover:text-gray-800"
          >
            See all Clubs and Activities
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((activity, index) => (
            <Card
              key={index}
              onClick={() => openManageActivityModal(activity)}
              className="cursor-pointer max-w-sm bg-gray-200 hover:bg-gray-300"
            >
              <div className="flex flex-col items-center pb-10">
                <FaUserTie className="text-4xl mb-4" />
                <h5 className="mb-1 text-md font-medium text-gray-800">
                  {activity.name}
                </h5>
                <div className="inline-flex items-center">
                  <svg
                    className={`mr-1.5 h-2.5 w-2.5 text-${activity.color}-500`}
                    fill="currentColor"
                    viewBox="0 0 8 8"
                  >
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                  <span className="text-sm text-gray-600">
                    {activity.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ManageActivityModal
        show={showManageActivityModal}
        onClose={closeManageActivityModal}
        selectedActivity={selectedActivity}
        onFlagSuspicious={handleFlagSuspiciousActivity}
        onActivateAccount={handleActivateAgentAccount}
        onCloseAccount={handleCloseAgentAccount}
      />
    </div>
  );
};

export default Activities;
