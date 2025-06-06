import api from './api';

export const emailVerificationService = {
  resendVerificationEmail: async (email) => {
    try {
      const response = await api.post('/users/resend-verification/', { email });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to resend verification email'
      };
    }
  },

  // Verify email with OTP
  verifyEmail: async (email, otp) => {
    try {
      const response = await api.post('/users/verify-email/', { 
        email,
        otp 
      });
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Invalid or expired OTP'
      };
    }
  },

  // Check if user is verified (by getting user profile)
  checkUserVerificationStatus: async () => {
    try {
      const response = await api.get('/users/me/');
      return {
        success: true,
        isVerified: response.data.is_verified,
        user: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Failed to check verification status'
      };
    }
  },

  // Register user (convenience method)
  registerUser: async (userData) => {
    try {
      const response = await api.post('/users/register/', userData);
      return {
        success: true,
        message: response.data.message,
        userId: response.data.user_id,
        email: response.data.email
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || 'Registration failed',
        errors: error.response?.data
      };
    }
  }
};

export default emailVerificationService;