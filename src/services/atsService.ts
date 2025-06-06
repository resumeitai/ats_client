import api from './api';

export interface ATSScoreCreate {
  resume_id: number;
  job_title: string;
  job_description: string;
}

export interface KeywordMatch {
  id: number;
  keyword: string;
  found: boolean;
  importance: 'high' | 'medium' | 'low';
  context: string;
}

export interface OptimizationSuggestion {
  id: number;
  section: string;
  original_text: string;
  suggested_text: string;
  reason: string;
  applied: boolean;
}

export interface ATSScore {
  id: number;
  job_title: string;
  job_description: string;
  score: number;
  analysis: Record<string, any>;
  suggestions: Record<string, any>;
  keyword_matches: KeywordMatch[];
  optimization_suggestions: OptimizationSuggestion[];
  created_at: string;
  updated_at: string;
}

export const atsService = {
  async createATSScore(data: ATSScoreCreate): Promise<ATSScore> {
    const response = await api.post('/ats/scores/', data);
    return response.data;
  },

  async getATSScores(): Promise<ATSScore[]> {
    const response = await api.get('/ats/scores/');
    return response.data.results;
  },

  async getATSScore(id: number): Promise<ATSScore> {
    const response = await api.get(`/ats/scores/${id}/`);
    return response.data;
  },

  async getKeywordMatches(scoreId: number): Promise<KeywordMatch[]> {
    const response = await api.get(`/ats/scores/${scoreId}/keyword_matches/`);
    return response.data;
  },

  async getOptimizationSuggestions(scoreId: number): Promise<OptimizationSuggestion[]> {
    const response = await api.get(`/ats/scores/${scoreId}/optimization_suggestions/`);
    return response.data;
  },

  async applySuggestion(scoreId: number, suggestionId: number): Promise<ATSScore> {
    const response = await api.post(`/ats/scores/${scoreId}/apply_suggestion/`, {
      suggestion_id: suggestionId,
    });
    return response.data;
  },

  async getJobTitleSynonyms(): Promise<any[]> {
    const response = await api.get('/ats/job-title-synonyms/');
    return response.data.results;
  },
};