export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskCategory = 'legal' | 'product' | 'marketing' | 'funding';

export interface Startup {
  id: string;
  name: string;
  sector: string;
  stage: string;
  description: string;
  founderId: string;
  createdAt: string;
}

export interface MilestoneTask {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  category: TaskCategory;
  status: TaskStatus;
  order: number;
}

export interface ActionPlan {
  id: string;
  startupId: string;
  tasks: MilestoneTask[];
  completionPercentage: number;
}

export interface EquityAgreement {
  id: string;
  status: 'pending' | 'signed' | 'expired';
  docuSignUrl: string;
  createdAt: string;
}

export interface InvestorMatchCount {
  count: number;
  newThisWeek: number;
}
