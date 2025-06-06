import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService, UserUpdateData, PasswordChangeData } from '@/services/userService';
import { toast } from '@/hooks/use-toast';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: userService.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: UserUpdateData) => userService.updateProfile(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to update profile',
        variant: 'destructive',
      });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwordData: PasswordChangeData) => userService.changePassword(passwordData),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Password changed successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to change password',
        variant: 'destructive',
      });
    },
  });
};

export const useUserActivities = () => {
  return useQuery({
    queryKey: ['user-activities'],
    queryFn: userService.getUserActivities,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: userService.deleteAccount,
    onSuccess: () => {
      toast({
        title: 'Account Deleted',
        description: 'Your account has been permanently deleted',
      });
      // Redirect to home page or login
      window.location.href = '/';
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to delete account',
        variant: 'destructive',
      });
    },
  });
};

export const useUploadAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => userService.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user'] });
      toast({
        title: 'Success',
        description: 'Avatar uploaded successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to upload avatar',
        variant: 'destructive',
      });
    },
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ['user-stats'],
    queryFn: userService.getUserStats,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};