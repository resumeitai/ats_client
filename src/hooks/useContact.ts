import { useMutation } from '@tanstack/react-query';
import { contactService, ContactFormData } from '@/services/contactService';
import { toast } from '@/hooks/use-toast';

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: (formData: ContactFormData) => contactService.submitContactForm(formData),
    onSuccess: (data) => {
      toast({
        title: 'Message Sent Successfully',
        description: `Thank you for contacting us! ${data.ticket_id ? `Ticket ID: ${data.ticket_id}` : 'We\'ll get back to you soon.'}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to Send Message',
        description: error.response?.data?.detail || 'Please try again later or contact us directly.',
        variant: 'destructive',
      });
    },
  });
};

export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: (feedback: { type: 'bug' | 'feature' | 'general'; description: string; email?: string }) =>
      contactService.submitFeedback(feedback),
    onSuccess: () => {
      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your feedback! We appreciate your input.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to Submit Feedback',
        description: error.response?.data?.detail || 'Please try again later.',
        variant: 'destructive',
      });
    },
  });
};