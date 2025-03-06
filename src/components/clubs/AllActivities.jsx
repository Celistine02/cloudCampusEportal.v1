import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import useActivityStore from "../../../production/zustand/features/students/activity";

const AllActivities = () => {
  const { activities, getActivitiesByStudent } = useActivityStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      await getActivitiesByStudent();
      setLoading(false);
    };

    fetchActivities();
  }, [getActivitiesByStudent]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading activities...</div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-8 font-mainFont bg-gray-50 text-gray-900">
      <h2 className="text-3xl font-extrabold mb-6 text-center">All Activities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-xl font-semibold text-blue-600">{activity.name}</h3>
            <p className="text-gray-700">Status: <span className="font-medium">{activity.status}</span></p>
            <p className="text-gray-600">Details: {activity.details}</p>
            <div className="flex justify-end">
              <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300">
                View Details
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllActivities;
