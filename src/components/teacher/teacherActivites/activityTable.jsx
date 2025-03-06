import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import useActivityStore from "./../../../../production/zustand/features/teachers/activitiesTeacher";

const ActivityTable = () => {
  // State to track number of activities displayed
  const [displayedActivities, setDisplayedActivities] = useState(8);
  const { activities, loading, error, fetchActivities, createActivity } = useActivityStore();
  const [showModal, setShowModal] = useState(false);
  const [activityName, setActivityName] = useState("");
  const [activityType, setActivityType] = useState("");

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Function to load more activities
  const loadMoreActivities = () => {
    // Increase the number of displayed activities by 8
    setDisplayedActivities((prevCount) => prevCount + 8);
  };

  // Function to add a new activity
  const addActivity = () => {
    if (activityName && activityType) {
      createActivity({ name: activityName, type: activityType });
      setShowModal(false);
      setActivityName("");
      setActivityType("");
    }
  };

  return (
    <div className="py-4 sm:py-4 bg-white text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-gray-800">Activities</p>
          </div>
          <div>
            <button
              className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
              onClick={() => setShowModal(true)}
            >
              Add Activity
            </button>
          </div>
        </div>

        {loading && <p>Loading activities...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && activities.length === 0 && <p>No activities available.</p>}
        {!loading && !error && activities.length > 0 && (
          <div className="flex flex-col mt-4 lg:mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                {/* table */}
                <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  {/* table titles */}
                  <thead className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                    <tr>
                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Activity Name</div>
                      </th>

                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Type</div>
                      </th>

                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Student Count</div>
                      </th>

                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Action</div>
                      </th>
                    </tr>
                  </thead>

                  {/* table body */}
                  <tbody className="text-gray-800 text-sm font-light">
                    {activities
                      .slice(0, displayedActivities)
                      .map((activity, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-200">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {activity.name}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {activity.type}
                          </td>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {activity.studentCount}
                          </td>
                          <td>
                            <div className="inline-flex items-center">
                              <FaDownload className="mr-1.5 h-2.5 w-2.5 text-gray-800" />
                              {activity.files && activity.files[0] && (
                                <a href={activity.files[0].filePath} download className="text-gray-800">
                                  Download
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {/* Show more button */}
                {displayedActivities < activities.length && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                      onClick={loadMoreActivities}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 backdrop-filter backdrop-blur-lg">
          <div className="flex items-center justify-center min-h-screen px-4 py-6">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900">Add New Activity</h2>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Activity Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="club">Club</option>
                    <option value="sport">Sport</option>
                  </select>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="ml-3 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
                    onClick={addActivity}
                  >
                    Add Activity
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;
