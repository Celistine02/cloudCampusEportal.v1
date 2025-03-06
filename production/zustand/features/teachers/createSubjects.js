import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';
import useTeacherStore from './../../auth/teacherstore';

const useSubjectStore = create((set) => ({
  subjects: [],
  subjectCount: 0, // Add subjectCount to the state
  error: null,
  loading: false,

  createSubject: async (name, form) => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId, schoolId } = teacher;

    if (!schoolId || !name || !teacherId || !form || !Array.isArray(form) || form.length === 0) {
      set({ error: 'Invalid input. Please provide all required fields.' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/teachers/${teacherId}/schools/${schoolId}/subjects`, {
        name,
        form,
      });

      set((state) => ({
        subjects: [...state.subjects, response.data.subject],
        subjectCount: state.subjects.length + 1, // Update subjectCount
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error creating subject:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while creating the subject',
      });
    }
  },

  updateSubject: async (subjectId, name, form) => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId, schoolId } = teacher;

    if (!name && !form) {
      set({ error: 'No valid fields provided for update.' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.put(`${BACKEND_local_RRl}/sakiso/teachers/${teacherId}/schools/${schoolId}/subjects/${subjectId}`, {
        name,
        form,
      });

      set((state) => ({
        subjects: state.subjects.map((subject) =>
          subject._id === subjectId ? response.data.subject : subject
        ),
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error updating subject:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while updating the subject',
      });
    }
  },

  deleteSubject: async (subjectId) => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId, schoolId } = teacher;

    set({ loading: true, error: null });

    try {
      await axios.delete(`${BACKEND_local_RRl}/sakiso/teachers/${teacherId}/schools/${schoolId}/subjects/${subjectId}`);

      set((state) => ({
        subjects: state.subjects.filter((subject) => subject._id !== subjectId),
        subjectCount: state.subjects.length - 1, // Update subjectCount
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error('Error deleting subject:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while deleting the subject',
      });
    }
  },

  getSubjectsByTeacher: async () => {
    const { teacher } = useTeacherStore.getState();
    const { teacherId } = teacher;

    if (!teacherId) {
      set({ error: 'Invalid input. Please provide teacherId.' });
      return;
    }

    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/teachers/${teacherId}/subjects`);
      console.log('Response:', response);

      set({
        subjects: response.data.subjects,
        subjectCount: response.data.subjects.length, // Update subjectCount
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error('Error retrieving subjects:', error);
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'An error occurred while retrieving the subjects',
      });
    }
  },
}));

export default useSubjectStore;
