// src/production/zustand/features/homework/homeworkStore.js

import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_prod_RRl, BACKEND_local_RRl } from './../../../urls';
import useAuthStore from './../../auth/authStore'; // Import the auth store

const useHomeworkStore = create((set) => ({
  homeworks: [],
  loading: false,
  error: null,

  fetchHomeworks: async () => {
    const { student } = useAuthStore.getState(); // Retrieve student from auth store
    const studentId = student.studentId;
    const schoolId = student.schoolId;

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/students/${studentId}/schools/${schoolId}/homeworks`);
      set({ homeworks: response.data.homeworks, loading: false });
    } catch (error) {
      set({ error: error.response ? error.response.data.message : 'Error fetching homeworks', loading: false });
    }
  },
}));

export default useHomeworkStore;
