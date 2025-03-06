import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_prod_RRl,BACKEND_local_RRl } from '../../../urls';
// Define the initial state and actions for the exam store
const useExamStore = create((set) => ({
  // Initial state
  exams: [],

  // Action to add a new exam
  addExam: async (exam) => {
    try {
      // Attempt to post the new exam to the production API
      const response = await axios.post(`${BACKEND_prod_RRl}/portal/exams/create`, exam);
      // Update the state with the new exam
      set((state) => ({ exams: [...state.exams, response.data] }));
    } catch (error) {
      console.error('Error adding exam to production:', error);
      // If the production API fails, try the local API
      try {
        const localResponse = await axios.post(`${BACKEND_local_RRl}/prtal/exams/create`, exam);
        set((state) => ({ exams: [...state.exams, localResponse.data] }));
      } catch (localError) {
        console.error('Error adding exam to local:', localError);
      }
    }
  },

  // Action to update an existing exam
  updateExam: async (examId, updates) => {
    try {
      // Attempt to patch the updates to the production API
      const response = await axios.patch(`${BACKEND_prod_RRl}/portal/exams/${examId}`, updates);
      // Update the state with the updated exam
      set((state) => ({
        exams: state.exams.map(exam => exam._id === examId ? response.data : exam)
      }));
    } catch (error) {
      console.error('Error updating exam in production:', error);
      // If the production API fails, try the local API
      try {
        const localResponse = await axios.patch(`${BACKEND_local_RRl}/portal/exams/${examId}`, updates);
        set((state) => ({
          exams: state.exams.map(exam => exam._id === examId ? localResponse.data : exam)
        }));
      } catch (localError) {
        console.error('Error updating exam in local:', localError);
      }
    }
  },

  // Action to retrieve all exams
  getExams: async () => {
    try {
      // Attempt to get all exams from the production API
      const response = await axios.get(`${BACKEND_prod_RRl}/portal/exams`);
      // Update the state with the retrieved exams
      set({ exams: response.data });
    } catch (error) {
      console.error('Error retrieving exams from production:', error);
      // If the production API fails, try the local API
      try {
        const localResponse = await axios.get(`${BACKEND_local_RRl}/portal/exams`);
        set({ exams: localResponse.data });
      } catch (localError) {
        console.error('Error retrieving exams from local:', localError);
      }
    }
  },

  // Action to delete an exam
  deleteExam: async (examId) => {
    try {
      // Attempt to delete the exam from the production API
      await axios.delete(`${BACKEND_prod_RRl}/portal/exams/${examId}`);
      // Update the state to remove the deleted exam
      set((state) => ({ exams: state.exams.filter(exam => exam._id !== examId) }));
    } catch (error) {
      console.error('Error deleting exam from production:', error);
      // If the production API fails, try the local API
      try {
        await axios.delete(`${BACKEND_local_RRl}/portal/exams/${examId}`);
        set((state) => ({ exams: state.exams.filter(exam => exam._id !== examId) }));
      } catch (localError) {
        console.error('Error deleting exam from local:', localError);
      }
    }
  },
}));

export default useExamStore;
