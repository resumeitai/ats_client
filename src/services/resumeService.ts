import api from './api';

export interface Resume {
  id: number;
  title: string;
  content: Record<string, any>;
  template?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ResumeCreate {
  title: string;
  content: Record<string, any>;
  template?: number;
  is_active?: boolean;
}

export interface ResumeUpdate {
  title?: string;
  content?: Record<string, any>;
  template?: number;
  is_active?: boolean;
}

export interface Template {
  id: number;
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
  thumbnail: string;
  is_premium: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const resumeService = {
  async getResumes(): Promise<Resume[]> {
    const response = await api.get('/resumes/');
    return response.data.results;
  },

  async getResume(id: number): Promise<Resume> {
    const response = await api.get(`/resumes/${id}/`);
    return response.data;
  },

  async createResume(resumeData: ResumeCreate): Promise<Resume> {
    const response = await api.post('/resumes/', resumeData);
    return response.data;
  },

  async updateResume(id: number, resumeData: ResumeUpdate): Promise<Resume> {
    const response = await api.patch(`/resumes/${id}/`, resumeData);
    return response.data;
  },

  async deleteResume(id: number): Promise<void> {
    await api.delete(`/resumes/${id}/`);
  },

  async getTemplates(): Promise<Template[]> {
    const response = await api.get('/templates/');
    return response.data.results;
  },

  async getTemplate(id: number): Promise<Template> {
    const response = await api.get(`/templates/${id}/`);
    return response.data;
  },

  async getResumeVersions(resumeId: number): Promise<any[]> {
    const response = await api.get(`/resumes/${resumeId}/versions/`);
    return response.data;
  },

  async restoreResumeVersion(resumeId: number, versionId: number): Promise<Resume> {
    const response = await api.get(`/resumes/${resumeId}/restore_version/?version=${versionId}`);
    return response.data;
  },
};