import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';
import useTeacherStore from './../../auth/teacherstore';

const useTimetableStore = create((set) => ({
  timetables: [],
  loading: false,
  error: null,

  fetchTimetables: async () => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId, schoolId } = teacher;

    if (!teacherId || !schoolId) {
      set({ error: 'Invalid input. Please provide teacherId and schoolId.' });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/schools/${schoolId}/teachers/${teacherId}/timetables`);
      set({ timetables: response.data.timetables, loading: false });
    } catch (error) {
      console.error('Error fetching timetables:', error.message);
      set({ error: error.response ? error.response.data.message : 'An error occurred while fetching the timetables', loading: false });
    }
  },

  createTimetable: async (timetableData) => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId, schoolId } = teacher;

    if (!teacherId || !schoolId) {
      set({ error: 'Invalid input. Please provide teacherId and schoolId.' });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/schools/${schoolId}/teachers/${teacherId}/timetables`, timetableData);
      set((state) => ({
        timetables: [...state.timetables, response.data.timetable],
        loading: false,
      }));
    } catch (error) {
      console.error('Error creating timetable:', error.message);
      set({ error: error.response ? error.response.data.message : 'An error occurred while creating the timetable', loading: false });
    }
  },

  updateTimetable: async (timetableId, timetableData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`${BACKEND_local_RRl}/sakiso/timetables/${timetableId}`, timetableData);
      set((state) => ({
        timetables: state.timetables.map((timetable) =>
          timetable._id === timetableId ? response.data.timetable : timetable
        ),
        loading: false,
      }));
    } catch (error) {
      console.error('Error updating timetable:', error.message);
      set({ error: error.response ? error.response.data.message : 'An error occurred while updating the timetable', loading: false });
    }
  },

  deleteTimetable: async (timetableId) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BACKEND_local_RRl}/sakiso/timetables/${timetableId}`);
      set((state) => ({
        timetables: state.timetables.filter((timetable) => timetable._id !== timetableId),
        loading: false,
      }));
    } catch (error) {
      console.error('Error deleting timetable:', error.message);
      set({ error: error.response ? error.response.data.message : 'An error occurred while deleting the timetable', loading: false });
    }
  },
}));

export default useTimetableStore;
