import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';


const useStudentAttendanceStore = create((set) => ({
  students: [],
  loading: false,
  error: null,

  updateStudentAttendance: async (studentId, date, status) => {


    if (!studentId || !date || !status) {
      set({ error: 'Invalid input. Please provide all required fields.' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.put(`${BACKEND_local_RRl}/sakiso/students/attendance`, { studentId, date, status });
      set((state) => ({
        students: state.students.map((student) =>
          student._id === studentId ? response.data : student
        ),
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error updating student attendance:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while updating the student attendance',
      });
    }
  },
}));

export default useStudentAttendanceStore;



