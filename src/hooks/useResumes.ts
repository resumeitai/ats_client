import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeService, Resume, ResumeCreate, ResumeUpdate, Template } from '@/services/resumeService';
import { toast } from '@/hooks/use-toast';

export const useResumes = () => {
  return useQuery({
    queryKey: ['resumes'],
    queryFn: resumeService.getResumes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useResume = (id: number) => {
  return useQuery({
    queryKey: ['resume', id],
    queryFn: () => resumeService.getResume(id),
    enabled: !!id,
  });
};

export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (resumeData: ResumeCreate) => resumeService.createResume(resumeData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: 'Success',
        description: 'Resume created successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to create resume',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ResumeUpdate }) =>
      resumeService.updateResume(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume', variables.id] });
      toast({
        title: 'Success',
        description: 'Resume updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to update resume',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => resumeService.deleteResume(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: 'Success',
        description: 'Resume deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to delete resume',
        variant: 'destructive',
      });
    },
  });
};

export const useTemplates = () => {
  return useQuery({
    queryKey: ['templates'],
    queryFn: resumeService.getTemplates,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTemplate = (id: number) => {
  return useQuery({
    queryKey: ['template', id],
    queryFn: () => resumeService.getTemplate(id),
    enabled: !!id,
  });
};

export const useResumeVersions = (resumeId: number) => {
  return useQuery({
    queryKey: ['resume-versions', resumeId],
    queryFn: () => resumeService.getResumeVersions(resumeId),
    enabled: !!resumeId,
  });
};