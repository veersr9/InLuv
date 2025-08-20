import { create } from 'zustand';
import { authService } from '../services/api/authService';
import Storage from '../utils/storage';

export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  // Initialize auth from storage
  initializeAuth: async () => {
    try {
      const token = await Storage.getToken();
      const userData = await Storage.getUserData();
      
      if (token) {
        set({ 
          token, 
          user: userData,
          isAuthenticated: true 
        });
      }
    } catch (error) {
      console.error('Auth init error:', error);
    }
  },

  // Send OTP
  sendOTP: async (phoneNumber) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.sendOTP(phoneNumber);
      set({ isLoading: false });
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Verify OTP
  verifyOTP: async (phoneNumber, otp) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authService.verifyOTP(phoneNumber, otp);
      
      // Store token and user data if login successful
      if (response.token) {
        await Storage.setToken(response.token);
        await Storage.setUserData({
          phoneNumber,
          userId: response.user_id
        });
        
        set({
          user: { phoneNumber, userId: response.user_id },
          token: response.token,
          isAuthenticated: true,
          isLoading: false,
        });
      }

      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Logout
  logout: async () => {
    await Storage.clearAuthData();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },
}));