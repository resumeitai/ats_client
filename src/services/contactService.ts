import api from './api';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  ticket_id?: string;
}

export const contactService = {
  async submitContactForm(formData: ContactFormData): Promise<ContactResponse> {
    const response = await api.post('/contact/', formData);
    return response.data;
  },

  async submitFeedback(feedback: {
    type: 'bug' | 'feature' | 'general';
    description: string;
    email?: string;
  }): Promise<ContactResponse> {
    const response = await api.post('/feedback/', feedback);
    return response.data;
  },
};