import { create } from 'zustand'
import axios from 'axios';
import { BACKEND_prod_RRl, BACKEND_local_RRl } from '../../urls';

// Define the initial state and actions for the signup store
const useSignupStore = create((set) => ({
    school: null,
    loading: false,
    error: null,

    // Action to sign up the school
    // signup: async (schoolData) => {
    //     set({ loading: true, error: null });
    //     try {
    //         const response = await axios.post(`${BACKEND_prod_RRl}/school/signup`, schoolData);

    //         // Set the school in the state
    //         set({
    //             school: response.data.school,
    //             loading: false,
    //             error: null
    //         });
    //     } catch (error) {
    //         // Handle errors and set error state
    //         set({
    //             loading: false,
    //             error: error.response ? error.response.data.message : 'Error signing up'
    //         });
    //     }
    // }

    // Action to sign up a new school
    signup: async ({
        schoolName, 
        address, 
        contactEmail, 
        contactNumber, 
        principalName, 
        establishedYear, 
        schoolType, 
        numberOfStudents, 
        numberOfTeachers, 
        website, 
        password
    }) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(`${BACKEND_prod_RRl}/portal/school/signup`, {
                schoolName,
                address,
                contactEmail,
                contactNumber,
                principalName,
                establishedYear,
                schoolType,
                numberOfStudents,
                numberOfTeachers,
                website,
                password
            });

            // Set the school and token in the state
            set({
                school: response.data.school,
                // token: response.data.token,
                loading: false,
                error: null
            });
        } catch (error) {
            // Handle errors and set error state
            set({
                loading: false,
                error: error.response ? error.response.data.message : 'Error signing up'
            });
        }
    },
}));

export default useSignupStore;
