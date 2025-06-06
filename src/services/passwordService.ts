import api from './api';

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
  confirm_password: string;
}

export interface PasswordResetResponse {
  success: boolean;
  message: string;
}

export const passwordService = {
  async requestPasswordReset(email: string): Promise<PasswordResetResponse> {
    const response = await api.post('/auth/forgot-password/', { email });
    return response.data;
  },

  async resetPassword(data: ResetPasswordData): Promise<PasswordResetResponse> {
    const response = await api.post('/auth/reset-password/', data);
    return response.data;
  },

  async validateResetToken(token: string): Promise<{ valid: boolean }> {
    const response = await api.get(`/auth/validate-reset-token/${token}/`);
    return response.data;
  },
};