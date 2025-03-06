import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_prod_RRl, BACKEND_local_RRl } from './../../../urls';

// Create a Zustand store for managing notices
const useNoticeStore = create((set) => ({
  // Initial state: an empty array of notices
  notices: [],
  
  // Asynchronous function to fetch notices from the server
  fetchNotices: async () => {
    try {
      // Make a GET request to the production backend URL
      const response = await axios.get(`${BACKEND_prod_RRl}/portal/notices`);
      
      // Log the response
      console.log('Fetch notices response:', response);

      // Access the data array within the response
      const notices = response.data.data || [];

      // Update the state with the fetched notices
      set({ notices });
    } catch (error) {
      // If the request to the production URL fails, try the local URL
      try {
        // Make a GET request to the local backend URL
        const localResponse = await axios.get(`${BACKEND_local_RRl}/portal/notices`);
        
        // Log the response
        console.log('Fetch notices response (local):', localResponse);

        // Access the data array within the response
        const notices = localResponse.data.data || [];

        // Update the state with the fetched notices
        set({ notices });
      } catch (localError) {
        // Log an error message if the request to the local URL fails
        console.error('Failed to fetch notices (local):', localError);
      }
    }
  },
  
  // Function to add a new notice
  addNotice: async (notice) => {
    try {
      // Attempt to make a POST request to the production backend URL
      const response = await axios.post(`${BACKEND_prod_RRl}/portal/notices`, notice);
      
      // Log the response
      console.log('Add notice response:', response);

      // Fetch the notices again to update the state
      useNoticeStore.fetchNotices();
    } catch (error) {
      // If the request to the production URL fails, try the local URL
      try {
        // Make a POST request to the local backend URL
        const localResponse = await axios.post(`${BACKEND_local_RRl}/portal/notices`, notice);
        
        // Log the response
        console.log('Add notice response (local):', localResponse);

        // Fetch the notices again to update the state
        useNoticeStore.fetchNotices();
      } catch (localError) {
        // Log an error message if the request to the local URL fails
        console.error('Failed to add notice (local):', localError);
      }
    }
  },
}));

// Export the useNoticeStore hook for use in other parts of the application
export default useNoticeStore;
