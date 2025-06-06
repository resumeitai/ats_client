import api from './api';
import { User } from './authService';

export interface UserUpdateData {
  username?: string;
  email?: string;
  full_name?: string;
  phone_number?: string;
}

export interface PasswordChangeData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface UserActivity {
  id: number;
  activity_type: string;
  description: string;
  created_at: string;
}

export interface UserStats {
  total_resumes: number;
  total_ats_analyses: number;
  total_referrals: number;
  account_created: string;
  last_login: string;
}

export const userService = {
  async getCurrentUser(): Promise<User> {
    const response = await api.get('/users/me/');
    return response.data.results[0];
  },

  async updateProfile(userData: UserUpdateData): Promise<User> {
    const response = await api.patch('/users/me/', userData);
    return response.data;
  },

  async changePassword(passwordData: PasswordChangeData): Promise<void> {
    await api.post('/users/change-password/', passwordData);
  },

  async getUserActivities(): Promise<UserActivity[]> {
    const response = await api.get('/users/activities/');
    return response.data.results;
  },

  async deleteAccount(): Promise<void> {
    await api.delete('/users/me/');
  },

  async uploadAvatar(file: File): Promise<User> {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await api.post('/users/upload-avatar/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  async getUserStats(): Promise<UserStats> {
    const response = await api.get('/users/stats/');
    return response.data;
  },
};