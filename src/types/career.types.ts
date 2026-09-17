export interface CareerGoal {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export type MilestoneStatus = 'upcoming' | 'in_progress' | 'done';

export interface Milestone {
  id: string;
  month: string;
  title: string;
  description: string;
  examName?: string;
  examDate?: string;
  status: MilestoneStatus;
  subTasks: SubTask[];
  resources: Resource[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  type: 'video' | 'article' | 'course' | 'book';
}

export interface Roadmap {
  id: string;
  goalId: string;
  goalTitle: string;
  milestones: Milestone[];
  completionPercentage: number;
  createdAt: string;
}

export interface CareerQuery {
  id: string;
  query: string;
  createdAt: string;
}

export interface ScholarshipAlert {
  id: string;
  name: string;
  deadline: string;
  amount: string;
  eligibility: string;
}
