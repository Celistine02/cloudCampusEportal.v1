import { create } from 'zustand';
import axios from 'axios';
import { BACKEND_local_RRl } from './../../../urls';

const useFileUploadStore = create((set) => ({
  files: [],
  loading: false,
  error: null,

  uploadFile: async (file, title, description, uploadedBy) => {
    if (!file || !title || !description || !uploadedBy) {
      set({ error: 'Invalid input. Please provide all required fields.' });
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('uploadedBy', uploadedBy);

    set({ loading: true, error: null });

    try {
      const response = await axios.post(`${BACKEND_local_RRl}/sakiso/files/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      set((state) => ({
        files: [...state.files, response.data.resource],
        loading: false,
        error: null,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data.error || 'An error occurred while uploading the file' : 'Server is unreachable',
      });
    }
  },

  retrieveFiles: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`${BACKEND_local_RRl}/sakiso/files/retrieve`);
      
      set({
        files: response.data.resources,
        loading: false,
        error: null,
      });
    } catch (error) {
      set({
        loading: false,
        error: error.response ? error.response.data.error || 'An error occurred while retrieving the files' : 'Server is unreachable',
      });
    }
  },
}));

export default useFileUploadStore;
