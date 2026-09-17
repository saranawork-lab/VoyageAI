export interface ChildProfile {
  id: string;
  name: string;
  school: string;
  grade: string;
  goal: string;
  goalAlignmentScore: number;
  avatarUrl: string | null;
}

export interface GradeRecord {
  id: string;
  subject: string;
  score: number;
  maxScore: number;
  examName: string;
  examDate: string;
}

export interface GradeHistory {
  records: GradeRecord[];
  subjects: string[];
}

export interface SubjectPriority {
  subject: string;
  priority: 'focus_more' | 'on_track' | 'reduce_time';
  aiReason: string;
}

export interface Digest {
  id: string;
  weekOf: string;
  summary: string;
  isRead: boolean;
  generatedAt: string;
  period: string;
}

export interface GoalAlignment {
  score: number;
  trend: 'improving' | 'stable' | 'declining';
  recommendation: string;
}

export interface MentorSession {
  id: string;
  mentorName: string;
  date: string;
  time: string;
  type: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}
