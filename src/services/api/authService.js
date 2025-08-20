import axiosClient from '../http/axiosClient';
import { API_ENDPOINTS } from '../ApiConstants';

class AuthService {
  // Check phone number format
  async checkPhoneNumber(phoneNumber) {
    return axiosClient.get(API_ENDPOINTS.AUTH.CHECK_PHONE(phoneNumber));
  }

  // Send OTP to phone number
  async sendOTP(phoneNumber) {
    return axiosClient.post(API_ENDPOINTS.AUTH.SEND_OTP, {
      phone_number: phoneNumber,
    });
  }

  // Verify OTP and login
  async verifyOTP(phoneNumber, otp) {
    return axiosClient.post(API_ENDPOINTS.AUTH.VERIFY_OTP, {
      phone_number: phoneNumber,
      otp: otp,
    });
  }
}

export const authService = new AuthService();