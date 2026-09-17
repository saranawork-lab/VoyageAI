import type { ApiResponse } from '@/types/api.types';
import type { Startup, ActionPlan, EquityAgreement, InvestorMatchCount } from '@/types/startup.types';

export const getStartupProfile = async (founderId: string): Promise<ApiResponse<Startup>> => {
  void founderId;
  return {
    success: true,
    data: {
      id: 'stp_001',
      name: 'VoyageAI',
      sector: 'EdTech',
      stage: 'Idea',
      description: 'AI-powered guidance platform for students and founders.',
      founderId: 'usr_001',
      createdAt: new Date().toISOString(),
    },
  };
};

export const getActionPlan = async (startupId: string): Promise<ApiResponse<ActionPlan>> => {
  void startupId;
  return {
    success: true,
    data: {
      id: 'plan_001',
      startupId: 'stp_001',
      completionPercentage: 25,
      tasks: [
        { id: 't1', title: 'Register Company', description: 'Incorporate as Private Limited', estimatedTime: '1 week', category: 'legal', status: 'done', order: 1 },
        { id: 't2', title: 'Build Landing Page', description: 'Create waitlist page', estimatedTime: '3 days', category: 'product', status: 'in_progress', order: 2 },
        { id: 't3', title: 'Talk to 10 Users', description: 'Conduct user interviews', estimatedTime: '2 weeks', category: 'marketing', status: 'todo', order: 3 },
      ],
    },
  };
};

export const updateTaskStatus = async (
  taskId: string,
  status: string
): Promise<ApiResponse<{ updated: boolean }>> => {
  void taskId; void status;
  return { success: true, data: { updated: true } };
};

export const getEquityAgreements = async (startupId: string): Promise<ApiResponse<EquityAgreement[]>> => {
  void startupId;
  return {
    success: true,
    data: [
      { id: 'eq_1', status: 'pending', docuSignUrl: '#', createdAt: new Date().toISOString() },
    ],
  };
};

export const getInvestorMatchesCount = async (startupId: string): Promise<ApiResponse<InvestorMatchCount>> => {
  void startupId;
  return {
    success: true,
    data: { count: 12, newThisWeek: 3 },
  };
};
