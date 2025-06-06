import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { atsService, ATSScoreCreate, ATSScore } from '@/services/atsService';
import { toast } from '@/hooks/use-toast';

export const useATSScores = () => {
  return useQuery({
    queryKey: ['ats-scores'],
    queryFn: atsService.getATSScores,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useATSScore = (id: number) => {
  return useQuery({
    queryKey: ['ats-score', id],
    queryFn: () => atsService.getATSScore(id),
    enabled: !!id,
  });
};

export const useCreateATSScore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ATSScoreCreate) => atsService.createATSScore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ats-scores'] });
      toast({
        title: 'Success',
        description: 'ATS analysis completed successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to analyze resume',
        variant: 'destructive',
      });
    },
  });
};

export const useKeywordMatches = (scoreId: number) => {
  return useQuery({
    queryKey: ['keyword-matches', scoreId],
    queryFn: () => atsService.getKeywordMatches(scoreId),
    enabled: !!scoreId,
  });
};

export const useOptimizationSuggestions = (scoreId: number) => {
  return useQuery({
    queryKey: ['optimization-suggestions', scoreId],
    queryFn: () => atsService.getOptimizationSuggestions(scoreId),
    enabled: !!scoreId,
  });
};

export const useApplySuggestion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ scoreId, suggestionId }: { scoreId: number; suggestionId: number }) =>
      atsService.applySuggestion(scoreId, suggestionId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['ats-score', variables.scoreId] });
      queryClient.invalidateQueries({ queryKey: ['optimization-suggestions', variables.scoreId] });
      toast({
        title: 'Success',
        description: 'Suggestion applied successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to apply suggestion',
        variant: 'destructive',
      });
    },
  });
};

export const useJobTitleSynonyms = () => {
  return useQuery({
    queryKey: ['job-title-synonyms'],
    queryFn: atsService.getJobTitleSynonyms,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};