import api from './api';

export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_months: number;
  features: Record<string, any>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: number;
  plan: SubscriptionPlan;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  start_date: string | null;
  end_date: string | null;
  is_auto_renew: boolean;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  amount: string;
  currency: string;
  payment_method: 'credit_card' | 'debit_card' | 'upi' | 'net_banking' | 'wallet';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transaction_id: string;
  payment_gateway_response: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Referral {
  id: number;
  code: string;
  is_successful: boolean;
  created_at: string;
}

export const subscriptionService = {
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    const response = await api.get('/subscriptions/plans/');
    return response.data.results;
  },

  async getCurrentSubscription(): Promise<Subscription | null> {
    try {
      const response = await api.get('/subscriptions/');
      return response.data.results[0] || null;
    } catch (error) {
      return null;
    }
  },

  async createSubscription(planId: number, autoRenew: boolean = true): Promise<Subscription> {
    const response = await api.post('/subscriptions/', {
      plan: planId,
      is_auto_renew: autoRenew,
    });
    return response.data;
  },

  async cancelSubscription(subscriptionId: number): Promise<Subscription> {
    const response = await api.post(`/subscriptions/${subscriptionId}/cancel/`);
    return response.data;
  },

  async renewSubscription(subscriptionId: number): Promise<Subscription> {
    const response = await api.post(`/subscriptions/${subscriptionId}/renew/`);
    return response.data;
  },

  async getTransactions(): Promise<Transaction[]> {
    const response = await api.get('/subscriptions/transactions/');
    return response.data.results;
  },

  async createTransaction(data: {
    subscription_id?: number;
    amount: string;
    currency?: string;
    payment_method: string;
  }): Promise<Transaction> {
    const response = await api.post('/subscriptions/transactions/', data);
    return response.data;
  },

  async processPayment(transactionId: number, paymentData: Record<string, any>): Promise<Transaction> {
    const response = await api.post(`/subscriptions/transactions/${transactionId}/process_payment/`, paymentData);
    return response.data;
  },

  async getReferrals(): Promise<Referral[]> {
    const response = await api.get('/users/referrals/my_referrals/');
    return response.data.results;
  },

  async createReferral(email: string, code: string): Promise<Referral> {
    const response = await api.post('/users/referrals/', { email, code });
    return response.data;
  },
};