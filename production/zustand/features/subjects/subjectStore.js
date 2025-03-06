// src/production/zustand/features/subjects/subjectStore.js

import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_prod_RRl, BACKEND_local_RRl } from './../../../urls';
import useAuthStore from './../../auth/authStore'; // Import the auth store

const useSubjectStore = create((set) => ({
  subjects: [],
  loading: false,
  error: null,

  fetchSubjects: async () => {
    const { student } = useAuthStore.getState(); // Retrieve student from auth store
    const studentId = student.studentId;
    const schoolId = student.schoolId;

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/students/${studentId}/schools/${schoolId}/subjects`);
      set({ subjects: response.data.subjects, loading: false });
    } catch (error) {
      set({ error: error.response ? error.response.data.message : 'Error fetching subjects', loading: false });
    }
  },
}));

export default useSubjectStore;
