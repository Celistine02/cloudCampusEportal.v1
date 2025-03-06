import { create } from 'zustand';
import axios from 'axios';
import useTeacherStore from '../../auth/teacherstore';
import { BACKEND_prod_RRl } from '../../../urls';

const useScheduleStore = create((set) => ({
    schedules: [],
    fetchSchedules: async () => {
        const { teacher } = useTeacherStore.getState();
        const schoolId = teacher.schoolId;

        if (!schoolId) {
            console.error("School ID not found");
            return;
        }

        try {
            const response = await axios.get(`${BACKEND_prod_RRl}/sakiso/${schoolId}/schedules`);
            console.log("Fetched schedules data:", response.data);
            set({ schedules: response.data });
        } catch (error) {
            console.error("Failed to fetch schedules:", error);
        }
    },
    createSchedule: async (scheduleData) => {
        const { teacher } = useTeacherStore.getState();
        const schoolId = teacher.schoolId;

        if (!schoolId) {
            console.error("School ID not found");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_prod_RRl}/sakiso/${schoolId}/schedules`, scheduleData);
            console.log("Created schedule data:", response.data);
            set((state) => ({ schedules: [...state.schedules, response.data] }));
        } catch (error) {
            console.error("Failed to create schedule:", error);
        }
    },
    updateSchedule: async (id, scheduleData) => {
        const { teacher } = useTeacherStore.getState();
        const schoolId = teacher.schoolId;

        if (!schoolId) {
            console.error("School ID not found");
            return;
        }

        try {
            const response = await axios.put(`${BACKEND_prod_RRl}/sakiso/${schoolId}/schedules/${id}`, scheduleData);
            console.log("Updated schedule data:", response.data);
            set((state) => ({
                schedules: state.schedules.map((schedule) =>
                    schedule._id === id ? response.data : schedule
                ),
            }));
        } catch (error) {
            console.error("Failed to update schedule:", error);
        }
    },
    deleteSchedule: async (id) => {
        const { teacher } = useTeacherStore.getState();
        const schoolId = teacher.schoolId;

        if (!schoolId) {
            console.error("School ID not found");
            return;
        }

        try {
            await axios.delete(`${BACKEND_prod_RRl}/sakiso/${schoolId}/schedules/${id}`);
            console.log("Deleted schedule ID:", id);
            set((state) => ({
                schedules: state.schedules.filter((schedule) => schedule._id !== id),
            }));
        } catch (error) {
            console.error("Failed to delete schedule:", error);
        }
    },
}));

export default useScheduleStore;


