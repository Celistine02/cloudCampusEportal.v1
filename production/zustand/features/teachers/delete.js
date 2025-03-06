/**
 * Import required dependencies
 */
import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_prod_RRl } from './../../../urls';

/**
 * Create a zustand store for deleting a teacher
 */
const useDeleteTeacherStore = create((set) => ({
  /**
   * State variables
   */
  isDeleting: false, // Flag to indicate if the delete operation is in progress
  deleteError: null, // Error message if the delete operation fails
  deleteSuccess: false, // Flag to indicate if the delete operation was successful

  /**
   * Function to delete a teacher
   * @param {string} id - The ID of the teacher to be deleted
   */
  deleteTeacher: async (id) => {
    /**
     * Set the initial state
     */
    set({ isDeleting: true, deleteError: null, deleteSuccess: false });

    try {
      /**
       * Send a delete request to the backend
       */
      const response = await axios.delete(`${BACKEND_prod_RRl}/portal/teachers/${id}`);

      /**
       * Update the state on successful deletion
       */
      set({ isDeleting: false, deleteError: null, deleteSuccess: true });
    } catch (error) {
      /**
       * Update the state on failed deletion
       */
      set({ isDeleting: false, deleteError: error.message, deleteSuccess: false });
    }
  },
}));

/**
 * Export the zustand store
 */
export default useDeleteTeacherStore;

