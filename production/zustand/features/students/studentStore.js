import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';
import useTeacherStore from './../../../zustand/auth/teacherstore'; // Import the teacher store

// Creating the useStudentStore with Zustand
const useStudentStore = create((set) => ({
  // Initial state of the store
  students: [],
  loading: false,
  error: null,
  studentCount: 0, // Count the total number of students
  studentCountByLevel: { // Initialize student count by level
    'form 1': 0,
    'form 2': 0,
    'form 3': 0,
    'form 4': 0,
    'form 5': 0,
    'form 6': 0,
  }, // Added to count the number of students by level

  // Action to fetch students
  fetchStudents: async () => {
    const { teacher } = useTeacherStore.getState(); // Get the teacher from teacher store
    const schoolIdToUse = teacher.schoolId; // Use schoolId from teacher store
    if (!schoolIdToUse) {
      console.error('No school found. Please sign in first.');
      return;
    }
    console.log('School ID used in students:', schoolIdToUse); // Log the school ID
    set({ loading: true, error: null }); // Set loading before fetching
    try {
      // Use schoolIdToUse in the API request
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/headmaster/view-students/${schoolIdToUse}`);
      console.log('Fetched students:', response.data);
      const studentCount = response.data.length; // Count the total number of students
      // Count students by level
      const studentCountByLevel = response.data.reduce((acc, student) => {
        acc[student.level] = (acc[student.level] || 0) + 1;
        return acc;
      }, {
        'form 1': 0,
        'form 2': 0,
        'form 3': 0,
        'form 4': 0,
        'form 5': 0,
        'form 6': 0,
      });
      set({ students: response.data, loading: false, error: null, studentCount, studentCountByLevel }); // Update the store with fetched students and counts
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'Error fetching students',
      });
      console.error('Error fetching students:', error.response ? error.response.data.message : 'Error fetching students');
    }
  },

  // Action to delete a student
  deleteStudent: async (studentId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.delete(`${BACKEND_local_RRl}/sakiso/headmaster/delete-student/${studentId}`);
      console.log('Student deleted:', response.data);
      set((state) => ({
        students: state.students.filter((student) => student.id !== studentId),
        loading: false,
        error: null
      }));
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'Error deleting student',
      });
      console.error('Error deleting student:', error.response ? error.response.data.message : 'Error deleting student');
    }
  },

  // Action to update a student's approval status
  updateStudentApprovalStatus: async (studentId, approvalStatus) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.patch(`${BACKEND_local_RRl}/sakiso/students/${studentId}/approval`, { approvalStatus });
      console.log('Student approval status updated:', response.data);
      set({ loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'Error updating student approval status',
      });
      console.error(
        'Error updating student approval status:',
        error.response ? error.response.data.message : 'Error updating student approval status'
      );
    }
  },

  // Action to add a student
  addStudent: async (studentData) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/students/signup`, studentData);
      console.log('Student added:', response.data);
      set({ loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'Error adding student',
      });
      console.error('Error adding student:', error.response ? error.response.data.message : 'Error adding student');
    }
  },
}));

export default useStudentStore;
