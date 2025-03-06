import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_prod_RRl } from '../../../urls';
import useAuthStore from '../../auth/authStore'; // Importing the auth store

const useTeacherStore = create((set) => ({
  teachers: [],
  error: null,
  fetchTeachers: async () => {
    const { student } = useAuthStore.getState(); // Retrieving the student from the auth store
    const studentId = student.studentId; // Extracting the studentId

    try {
      const response = await axios.get(`${BACKEND_prod_RRl}/sakiso/students/${studentId}/teachers`);
      set({ teachers: response.data.teachers, error: null });
    } catch (error) {
      console.error('Error retrieving teachers for subjects:', error);
      set({ teachers: [], error: 'An error occurred while retrieving teachers for the subjects' });
    }
  },
}));

export default useTeacherStore;
