// src/production/zustand/features/teachers/studentAttendanceStore.js

import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_prod_RRl, BACKEND_local_RRl } from './../../../urls';
import useAuthStore from './../../auth/authStore'; // Importing auth store to get student or teacher data

const useStudentAttendanceStore = create((set) => ({
  attendanceList: [],
  loading: false,
  error: null,

  // Fetch attendance list for a specific class
  fetchAttendanceList: async (studentId) => {
    const { student } = useAuthStore.getState();
    const schoolId = student?.schoolId;

    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/schools/${schoolId}/students/${studentId}/attendance`);
      set({ attendanceList: response.data.attendance, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error fetching attendance list',
        loading: false,
      });
    }
  },

  // Mark a student as present or absent
  markAttendance: async (studentId, status) => {
    const { student } = useAuthStore.getState();
    const schoolId = student?.schoolId;

    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${BACKEND_local_RRl}/sakiso/schools/${schoolId}/students/${studentId}/attendance`,
        { status }
      );
      set((state) => ({
        attendanceList: state.attendanceList.map((record) =>
          record.studentId === studentId ? { ...record, status: response.data.status } : record
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error updating attendance status',
        loading: false,
      });
    }
  },

  // Mark all students as present or absent
  markAllAttendance: async (status) => {
    const { student } = useAuthStore.getState();
    const schoolId = student?.schoolId;

    set({ loading: true, error: null });
    try {
      const response = await axios.put(
        `${BACKEND_local_RRl}/sakiso/schools/${schoolId}/students/attendance`,
        { status }
      );
      set((state) => ({
        attendanceList: state.attendanceList.map((record) => ({ ...record, status: response.data.status })),
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Error updating attendance status',
        loading: false,
      });
    }
  },

  // Clear error state
  clearError: () => set({ error: null }),
}));

export default useStudentAttendanceStore;
