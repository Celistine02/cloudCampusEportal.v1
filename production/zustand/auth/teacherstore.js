import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../urls';

const useTeacherStore = create((set) => ({
  teacher: {
    teacherId: null,
    schoolId: null,
    name: null,
    email: null,
    approvalStatus: null,
    subjects: [],
    department: null,
    role: null,
    attendance: [],
    classes: [],
  },
  token: null,
  loading: false,
  error: null,

  signin: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/teachers/signin`, { email, password });
      const { token, teacher } = response.data;

      set({
        teacher: {
          teacherId: teacher._id,
          schoolId: teacher.schoolId,
          name: teacher.name,
          email: teacher.email,
          approvalStatus: teacher.approvalStatus,
          subjects: teacher.subjects,
          department: teacher.department,
          role: teacher.role,
          attendance: teacher.attendance,
          classes: teacher.classes,
        },
        token: token,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'Error signing in',
      });
    }
  },

  signout: () => {
    set({
      teacher: {
        teacherId: null,
        schoolId: null,
        name: '',
        email: '',
        approvalStatus: '',
        subjects: [],
        department: '',
        role: '',
        attendance: [],
        classes: [],
      },
      token: null,
      error: null,
    });
  },

  signup: async (firstName, lastName, email, password, subjects, schoolName) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/teachers/signup`, {
        firstName,
        lastName,
        email,
        password,
        subjects,
        schoolName,
      });
      const { token, teacher } = response.data;

      set({
        teacher: {
          teacherId: teacher._id,
          schoolId: teacher.schoolId,
          name: `${firstName} ${lastName}`,
          email: email,
          approvalStatus: teacher.approvalStatus,
          subjects: teacher.subjects,
          department: teacher.department,
          role: teacher.role,
          attendance: teacher.attendance,
          classes: teacher.classes,
        },
        token: token,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data.message : 'Error signing up',
      });
    }
  },
}));

export default useTeacherStore;
