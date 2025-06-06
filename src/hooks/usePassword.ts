import { useMutation, useQuery } from '@tanstack/react-query';
import { passwordService, ResetPasswordData } from '@/services/passwordService';
import { toast } from '@/hooks/use-toast';

export const useRequestPasswordReset = () => {
  return useMutation({
    mutationFn: (email: string) => passwordService.requestPasswordReset(email),
    onSuccess: () => {
      toast({
        title: 'Reset Email Sent',
        description: 'Please check your email for password reset instructions.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to Send Reset Email',
        description: error.response?.data?.detail || 'Please check your email address and try again.',
        variant: 'destructive',
      });
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordData) => passwordService.resetPassword(data),
    onSuccess: () => {
      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been reset. You can now log in with your new password.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Password Reset Failed',
        description: error.response?.data?.detail || 'Please try again or request a new reset link.',
        variant: 'destructive',
      });
    },
  });
};

export const useValidateResetToken = (token: string) => {
  return useQuery({
    queryKey: ['validate-reset-token', token],
    queryFn: () => passwordService.validateResetToken(token),
    enabled: !!token,
    retry: false,
  });
};