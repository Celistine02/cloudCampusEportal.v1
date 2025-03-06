import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';

const useActivityStore = create((set) => ({
  activities: [],
  loading: false,
  error: null,

  fetchActivities: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/activities`);
      set({ activities: response.data, loading: false });
    } catch (error) {
      set({ error: error.response ? error.response.data.message : error.message, loading: false });
    }
  },

  createActivity: async (schoolId, activityData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/schools/${schoolId}/activities`, activityData);
      set((state) => ({ activities: [...state.activities, response.data], loading: false }));
    } catch (error) {
      set({ error: error.response ? error.response.data.message : error.message, loading: false });
    }
  },

  updateActivity: async (activityId, activityData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${BACKEND_local_RRl}/sakiso/activities/${activityId}`, activityData);
      set((state) => ({
        activities: state.activities.map((activity) =>
          activity._id === activityId ? response.data : activity
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response ? error.response.data.message : error.message, loading: false });
    }
  },

  deleteActivity: async (activityId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BACKEND_local_RRl}/sakiso/activities/${activityId}`);
      set((state) => ({
        activities: state.activities.filter((activity) => activity._id !== activityId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response ? error.response.data.message : error.message, loading: false });
    }
  },
}));

export default useActivityStore;
