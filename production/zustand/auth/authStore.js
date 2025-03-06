import { create } from 'zustand'; // Importing the create function from zustand for state management
import axios from 'axios'; // Importing axios for making HTTP requests
import { BACKEND_local_RRl } from './../../urls'; // Importing the backend URL for API calls

// Creating the useAuthStore with Zustand
const useAuthStore = create((set) => ({
    // Initial state of the store
    student: {
        studentId: null,
        schoolId: null,
        name: null,
        email: null,
        approvalStatus: null,
        level: null,
        section: null,
        parentGuardianInfo: {
            name: null,
            relationship: null,
            phoneNumber: null
        },
        feesId: null,
        boardingStatus: {
            isBoarder: false
        },
        attendanceRecord: [],
        behavior: null,
        role: null,
        medicalRecords: {},
        subjects: [] // Added subjects field
    },
    token: null,
    loading: false, // Indicates if an authentication action is in progress
    error: null, // Stores any error messages during authentication

    // Action to sign in a user
    signin: async (email, password) => {
        // Setting the loading state to true and error to null before attempting signin
        set({ loading: true, error: null });
        try {
            // Making a POST request to the signin API with email and password using the BACKEND_local_RRl
            const response = await axios.post(`${BACKEND_local_RRl}/sakiso/students/signin`, { email, password });
            const { token, student } = response.data;

            // Accessing student data from _doc
            const studentData = student._doc;

            // Set the student and token in the store
            set({
                student: {
                    studentId: studentData._id,
                    schoolId: studentData.schoolId,
                    name: studentData.name,
                    email: studentData.email,
                    approvalStatus: studentData.approvalStatus,
                    level: studentData.level,
                    section: studentData.section,
                    parentGuardianInfo: studentData.parentGuardianInfo,
                    feesId: studentData.feesId,
                    boardingStatus: studentData.boardingStatus,
                    attendanceRecord: studentData.attendanceRecord,
                    behavior: studentData.behavior,
                    role: studentData.role,
                    medicalRecords: studentData.medicalRecords,
                    subjects: studentData.subjects // Added subjects field
                },
                token: token,
                loading: false,
                error: null
            });
        } catch (error) {
            // Catching any errors that occur during signin and setting the error state with a detailed error message
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Error signing in'
            });
        }
    },

    // Action to sign out a user
    signout: () => {
        // Setting the student, token, and role state to null to sign out
        set({
            student: {
                studentId: null,
                schoolId: null,
                name: '',
                email: '',
                approvalStatus: '',
                level: '',
                section: '',
                parentGuardianInfo: {
                    name: '',
                    relationship: '',
                    phoneNumber: ''
                },
                feesId: null,
                boardingStatus: {
                    isBoarder: false,
                    hostelName: '',
                    roomNumber: ''
                },
                attendanceRecord: [],
                behavior: '',
                role: '',
                medicalRecords: {
                    allergies: '',
                    medicalConditions: '',
                    vaccinations: '',
                    medications: ''
                },
                subjects: [] // Added subjects field
            },
            token: null,
            error: null
        });
    },

    signup: async (name, address, phoneNumber, email, password, confirmPassword) => {
        set({ loading: true, error: null }); // Set loading state and clear errors
    
        try {
          const response = await axios.post(`${BACKEND_local_RRl}/sakiso/students/signup`, {
            name,
            address,
            phoneNumber,
            email,
            password,
            confirmPassword,
          });
    
          const studentProfileData = response.data.studentProfileData || {}; // Default to empty object if missing
          const token = response.data.token || ''; // Default to empty string if missing
          const role = response.data.role || ''; // Default to empty string if missing
    
          // Set the state in Zustand store
          set({
            student: {
              studentId: studentProfileData._id,
              schoolId: studentProfileData.schoolId,
              name: studentProfileData.name,
              email: studentProfileData.email,
              approvalStatus: studentProfileData.approvalStatus,
              level: studentProfileData.level,
              section: studentProfileData.section,
              parentGuardianInfo: studentProfileData.parentGuardianInfo,
              feesId: studentProfileData.feesId,
              boardingStatus: studentProfileData.boardingStatus,
              attendanceRecord: studentProfileData.attendanceRecord,
              behavior: studentProfileData.behavior,
              role: studentProfileData.role,
              medicalRecords: studentProfileData.medicalRecords,
              subjects: studentProfileData.subjects // Added subjects field
            },
            token: token,
            role: role, // Setting the role in the state
            loading: false,
            error: null,
          });
    
          // Redirect to the dashboard (make sure this is called after setting the state)
          const navigate = useNavigate();
          navigate('/dashboard');
    
        } catch (error) {
          // Capture the error message from the backend or default to a generic one
          const errorMessage = error.response?.data?.message || 'Error signing up';
    
          // Set the error state and disable loading
          set({
            loading: false,
            error: errorMessage,
          });
        }
      },
    }));

// Exporting the useAuthStore for use in other parts of the application
export default useAuthStore;
