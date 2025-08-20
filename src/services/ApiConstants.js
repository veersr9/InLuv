export const API_BASE_URL = 'http://192.168.11.55:8000'; // Replace with your IP

export const API_ENDPOINTS = {
  AUTH: {
    CHECK_PHONE: (phone) => `/api/v1/auth/check/phone/${phone}`,
    SEND_OTP: '/api/v1/auth/login/phone',
    VERIFY_OTP: '/api/v1/auth/verify/otp',
  },
};