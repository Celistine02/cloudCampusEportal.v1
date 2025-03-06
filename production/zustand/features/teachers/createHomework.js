import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';
import useTeacherStore from './../../auth/teacherstore';

const useHomeworkStore = create((set) => ({
  homeworks: [],
  homeworkCount: 0, // Add homeworkCount to the state
  error: null,
  loading: false,

  createHomework: async (name, form) => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId, schoolId } = teacher;

    if (!schoolId || !name || !teacherId || !form || !Array.isArray(form) || form.length === 0) {
      set({ error: 'Invalid input. Please provide all required fields.' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/teachers/${teacherId}/schools/${schoolId}/homeworks`, {
        name,
        form,
      });

      set((state) => ({
        homeworks: [...state.homeworks, response.data.homework],
        homeworkCount: state.homeworks.length + 1, // Update homeworkCount
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error creating homework:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while creating the homework',
      });
    }
  },

  updateHomework: async (homeworkId, name, form) => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId, schoolId } = teacher;

    if (!name && !form) {
      set({ error: 'No valid fields provided for update.' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.put(`${BACKEND_local_RRl}/sakiso/teachers/${teacherId}/schools/${schoolId}/homeworks/${homeworkId}`, {
        name,
        form,
      });

      set((state) => ({
        homeworks: state.homeworks.map((homework) =>
          homework._id === homeworkId ? response.data.homework : homework
        ),
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error updating homework:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while updating the homework',
      });
    }
  },

  deleteHomework: async (homeworkId) => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId, schoolId } = teacher;

    set({ loading: true, error: null });

    try {
      await axios.delete(`${BACKEND_local_RRl}/sakiso/teachers/${teacherId}/schools/${schoolId}/homeworks/${homeworkId}`);

      set((state) => ({
        homeworks: state.homeworks.filter((homework) => homework._id !== homeworkId),
        homeworkCount: state.homeworks.length - 1, // Update homeworkCount
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error deleting homework:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while deleting the homework',
      });
    }
  },

  getHomeworksByTeacher: async () => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId } = teacher;

    if (!teacherId) {
      set({ error: 'Invalid input. Please provide teacherId.' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/teachers/${teacherId}/homeworks`);
      console.log('Response:', response);

      set({
        homeworks: response.data.homeworks,
        homeworkCount: response.data.homeworks.length, // Update homeworkCount
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error retrieving homeworks:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while retrieving the homeworks',
      });
    }
  },
}));

export default useHomeworkStore;
