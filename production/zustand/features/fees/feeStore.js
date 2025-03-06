import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_prod_RRl, BACKEND_local_RRl } from "./../../../urls";
import useAuthStore from './../../auth/authStore'; // Importing the auth store

const useFeeStore = create((set) => ({
  fees: [],
  loading: false,
  error: null,

  getFeesByStudent: async () => {
    const { student } = useAuthStore.getState(); // Retrieving student data from the auth store
    const { studentId, schoolId } = student;

    if (!studentId || !schoolId) {
      set({ error: 'Invalid input. Please provide studentId and schoolId.' });
      return;
    }

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/students/${studentId}/schools/${schoolId}/fees`);
      set({ fees: response.data.fees, loading: false });
    } catch (error) {
      console.error('Error retrieving fees details for student:', error);
      set({ error: 'An error occurred while retrieving fees details for the student', loading: false });
    }
  },
}));

export default useFeeStore;
