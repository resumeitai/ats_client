import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriptionService, SubscriptionPlan, Subscription } from '@/services/subscriptionService';
import { toast } from '@/hooks/use-toast';

export const useSubscriptionPlans = () => {
  return useQuery({
    queryKey: ['subscription-plans'],
    queryFn: subscriptionService.getSubscriptionPlans,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCurrentSubscription = () => {
  return useQuery({
    queryKey: ['current-subscription'],
    queryFn: subscriptionService.getCurrentSubscription,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ planId, autoRenew }: { planId: number; autoRenew?: boolean }) =>
      subscriptionService.createSubscription(planId, autoRenew),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-subscription'] });
      toast({
        title: 'Success',
        description: 'Subscription created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to create subscription',
        variant: 'destructive',
      });
    },
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (subscriptionId: number) => subscriptionService.cancelSubscription(subscriptionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-subscription'] });
      toast({
        title: 'Success',
        description: 'Subscription cancelled successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to cancel subscription',
        variant: 'destructive',
      });
    },
  });
};

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: subscriptionService.getTransactions,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useReferrals = () => {
  return useQuery({
    queryKey: ['referrals'],
    queryFn: subscriptionService.getReferrals,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateReferral = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      subscriptionService.createReferral(email, code),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referrals'] });
      toast({
        title: 'Success',
        description: 'Referral sent successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to send referral',
        variant: 'destructive',
      });
    },
  });
};