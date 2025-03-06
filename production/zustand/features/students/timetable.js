import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';
import useAuthStore from './../../auth/authStore'; // Importing the auth store to get student ID

const useStudentTimetableStore = create((set) => ({
    studentTimetables: [],
    loading: false,
    error: null,

    fetchTimetablesForStudent: async () => {
        const studentId = useAuthStore.getState().student.studentId; // Get student ID from auth store
        if (!studentId) {
            set({ error: 'Invalid input. Please provide studentId.' });
            return;
        }

        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${BACKEND_local_RRl}/sakiso/students/${studentId}/timetables`);
            set({ studentTimetables: response.data.timetables, loading: false });
        } catch (error) {
            console.error('Error fetching timetables for student:', error.message);
            set({ error: error.response ? error.response.data.message : 'An error occurred while fetching the timetables', loading: false });
        }
    },
}));

export default useStudentTimetableStore;
