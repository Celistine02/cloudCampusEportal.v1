import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';
import useAuthStore from './../../auth/authStore'; // Importing the auth store

const useActivityStore = create((set) => ({
  activities: [],
  loading: false,
  error: null,

  joinActivity: async (activityId) => {
    const { student } = useAuthStore.getState();
    const studentId = student.studentId;
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/activities/${activityId}/join`, { studentId });
      set((state) => ({
        activities: state.activities.map(activity =>
          activity._id === activityId ? response.data.activity : activity
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response ? error.response.data.message : 'Error joining activity', loading: false });
    }
  },

  leaveActivity: async (activityId) => {
    const { student } = useAuthStore.getState();
    const studentId = student.studentId;
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/activities/${activityId}/leave`, { studentId });
      set((state) => ({
        activities: state.activities.map(activity =>
          activity._id === activityId ? response.data.activity : activity
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.response ? error.response.data.message : 'Error leaving activity', loading: false });
    }
  },

  getActivitiesByStudent: async () => {
    const { student } = useAuthStore.getState();
    const studentId = student.studentId;
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/students/${studentId}/activities`);
      set({ activities: response.data.activities, loading: false });
    } catch (error) {
      set({ error: error.response ? error.response.data.message : 'Error fetching activities', loading: false });
    }
  },

}));

export default useActivityStore;
