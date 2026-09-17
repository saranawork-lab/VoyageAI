import type { ApiResponse } from '@/types/api.types';
import type { ChildProfile, GradeHistory, GoalAlignment, Digest, MentorSession, SubjectPriority } from '@/types/parent.types';

export const getChildProfile = async (parentId: string): Promise<ApiResponse<ChildProfile>> => {
  void parentId;
  return {
    success: true,
    data: {
      id: 'child_001',
      name: 'Rohan Sharma',
      school: 'Delhi Public School',
      grade: '11th Grade - Science',
      goal: 'IIT JEE Advanced 2025',
      goalAlignmentScore: 85,
      avatarUrl: null,
    },
  };
};

export const getGradeHistory = async (childId: string): Promise<ApiResponse<GradeHistory>> => {
  void childId;
  return {
    success: true,
    data: {
      subjects: ['Physics', 'Chemistry', 'Mathematics'],
      records: [
        { id: 'g1', subject: 'Mathematics', score: 85, maxScore: 100, examName: 'Term 1', examDate: '2023-09' },
        { id: 'g2', subject: 'Mathematics', score: 92, maxScore: 100, examName: 'Mid Term', examDate: '2023-10' },
        { id: 'g3', subject: 'Mathematics', score: 88, maxScore: 100, examName: 'Mock Test 1', examDate: '2023-11' },
      ],
    },
  };
};

export const getGoalAlignment = async (childId: string): Promise<ApiResponse<GoalAlignment>> => {
  void childId;
  return {
    success: true,
    data: {
      score: 85,
      trend: 'improving',
      recommendation: 'Consider increasing focus on Organic Chemistry. Current mock test scores are 15% below target for Top 500 rank.',
    },
  };
};

export const getDigests = async (parentId: string): Promise<ApiResponse<Digest[]>> => {
  void parentId;
  return {
    success: true,
    data: [
      {
        id: 'dig_001',
        weekOf: 'Nov 12, 2023',
        summary: 'Rohan completed 85% of his scheduled tasks this week. Math scores improved by 7% in the latest mock test.',
        isRead: false,
        generatedAt: '2023-11-12T10:00:00Z',
        period: 'Weekly',
      },
      {
        id: 'dig_002',
        weekOf: 'Nov 5, 2023',
        summary: 'Rohan struggled with Physics concepts (Rotational Mechanics). We recommend scheduling a mentor session.',
        isRead: true,
        generatedAt: '2023-11-05T10:00:00Z',
        period: 'Weekly',
      },
    ],
  };
};

export const getMentorSessions = async (childId: string): Promise<ApiResponse<MentorSession[]>> => {
  void childId;
  return {
    success: true,
    data: [
      {
        id: 'sess_001',
        mentorName: 'Dr. Anand Kumar',
        date: '2023-11-15',
        time: '18:00',
        type: 'Doubt Clearing - Physics',
        status: 'upcoming',
      },
    ],
  };
};

export const getSubjectPriorities = async (childId: string): Promise<ApiResponse<SubjectPriority[]>> => {
  void childId;
  return {
    success: true,
    data: [
      { subject: 'Organic Chemistry', priority: 'focus_more', aiReason: 'Consistently scoring below 70% in recent tests.' },
      { subject: 'Calculus', priority: 'on_track', aiReason: 'Meeting target scores for JEE Advanced.' },
    ],
  };
};
