import { create } from 'zustand'
import axios from 'axios';

const useSettingsStore = create((set, get) => ({
  userInfo: {
    id: null,
    name: '',
    email: '',
  },
  updateUserInfo: async (newInfo) => {
    try {
      const response = await axios.put('/portal/user/update', newInfo);
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          ...response.data,
        },
      }));
    } catch (error) {
      console.error('Failed to update user info:', error);
    }
  },
  retrieveUserId: () => {
    const authStore = get().authStore;
    return authStore ? authStore.userId : null;
  },
}));

export default useSettingsStore;

