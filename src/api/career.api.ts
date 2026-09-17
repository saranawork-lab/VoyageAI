import type { ApiResponse } from '@/types/api.types';
import type { Roadmap, CareerQuery, ScholarshipAlert } from '@/types/career.types';

// ── Mock Data ──────────────────────────────────────────────
const MOCK_ROADMAP: Roadmap = {
  id: 'rdm_001',
  goalId: 'goal_001',
  goalTitle: 'Software Engineer at Google',
  completionPercentage: 35,
  createdAt: '2026-06-01T10:00:00Z',
  milestones: [
    {
      id: 'ms_001',
      month: 'Month 1-2',
      title: 'Master Data Structures & Algorithms',
      description: 'Complete all fundamental DSA concepts including arrays, linked lists, trees, graphs, and dynamic programming.',
      examName: 'DSA Certification',
      examDate: '2026-11-15',
      status: 'done',
      subTasks: [
        { id: 'st_001', title: 'Complete Arrays & Strings module', completed: true },
        { id: 'st_002', title: 'Practice 50 LeetCode Easy problems', completed: true },
        { id: 'st_003', title: 'Learn Trees & Graphs', completed: true },
      ],
      resources: [
        { id: 'r_001', title: 'NeetCode 150 Playlist', url: 'https://neetcode.io', type: 'video' },
        { id: 'r_002', title: 'CLRS Textbook', url: 'https://example.com/clrs', type: 'book' },
      ],
    },
    {
      id: 'ms_002',
      month: 'Month 3-4',
      title: 'Build Full-Stack Projects',
      description: 'Create 3 production-quality projects demonstrating frontend, backend, and system design skills.',
      status: 'in_progress',
      subTasks: [
        { id: 'st_004', title: 'Build a real-time chat app', completed: true },
        { id: 'st_005', title: 'Create a task management system', completed: false },
        { id: 'st_006', title: 'Deploy projects to cloud', completed: false },
      ],
      resources: [
        { id: 'r_003', title: 'Full Stack Open Course', url: 'https://fullstackopen.com', type: 'course' },
      ],
    },
    {
      id: 'ms_003',
      month: 'Month 5',
      title: 'System Design Fundamentals',
      description: 'Learn distributed systems, database design, caching, load balancing, and microservices.',
      status: 'upcoming',
      subTasks: [
        { id: 'st_007', title: 'Study system design primer', completed: false },
        { id: 'st_008', title: 'Design 5 common systems', completed: false },
      ],
      resources: [
        { id: 'r_004', title: 'System Design Interview Book', url: 'https://example.com/sdi', type: 'book' },
      ],
    },
    {
      id: 'ms_004',
      month: 'Month 6-7',
      title: 'Interview Preparation',
      description: 'Practice mock interviews, behavioral questions, and coding rounds specific to Google.',
      status: 'upcoming',
      subTasks: [
        { id: 'st_009', title: 'Complete 100 LeetCode Medium problems', completed: false },
        { id: 'st_010', title: 'Do 5 mock interviews', completed: false },
        { id: 'st_011', title: 'Prepare STAR stories', completed: false },
      ],
      resources: [
        { id: 'r_005', title: 'Pramp Mock Interviews', url: 'https://pramp.com', type: 'article' },
      ],
    },
    {
      id: 'ms_005',
      month: 'Month 8',
      title: 'Apply & Network',
      description: 'Submit applications, reach out to Google recruiters, and attend tech meetups.',
      status: 'upcoming',
      subTasks: [
        { id: 'st_012', title: 'Update resume and LinkedIn', completed: false },
        { id: 'st_013', title: 'Apply through referral network', completed: false },
      ],
      resources: [],
    },
  ],
};

const MOCK_QUERIES: CareerQuery[] = [
  { id: 'q_001', query: 'Software Engineer at Google', createdAt: '2026-09-01T10:00:00Z' },
  { id: 'q_002', query: 'Data Scientist at Microsoft', createdAt: '2026-08-20T10:00:00Z' },
  { id: 'q_003', query: 'Product Manager career path', createdAt: '2026-08-15T10:00:00Z' },
];

const MOCK_SCHOLARSHIPS: ScholarshipAlert[] = [
  {
    id: 'sch_001',
    name: 'Google Generation Scholarship',
    deadline: '2026-09-25T23:59:59Z',
    amount: '₹5,00,000',
    eligibility: 'CS students with CGPA > 8.0',
  },
  {
    id: 'sch_002',
    name: 'Tata Trust Merit Award',
    deadline: '2026-10-10T23:59:59Z',
    amount: '₹2,50,000',
    eligibility: 'Engineering students from Tier-2 cities',
  },
];

// ── API Functions ──────────────────────────────────────────

export const generateCareerRoadmap = async (
  query: string
): Promise<ApiResponse<Roadmap>> => {
  if (query) {
    return { success: true, data: { ...MOCK_ROADMAP, goalTitle: query } };
  }
  // const { data } = await apiClient.post('/guidance/career/generate', { query });
  // return data;
  return { success: true, data: MOCK_ROADMAP };
};

export const getCareerRoadmap = async (
  userId: string
): Promise<ApiResponse<Roadmap>> => {
  void userId;
  return { success: true, data: MOCK_ROADMAP };
};

export const updateCareerProgress = async (
  userId: string,
  milestoneId: string
): Promise<ApiResponse<{ updated: boolean }>> => {
  void userId;
  void milestoneId;
  return { success: true, data: { updated: true } };
};

export const getCareerQueries = async (
  userId: string
): Promise<ApiResponse<CareerQuery[]>> => {
  void userId;
  return { success: true, data: MOCK_QUERIES };
};

export const getScholarshipAlerts = async (
  userId: string
): Promise<ApiResponse<ScholarshipAlert[]>> => {
  void userId;
  return { success: true, data: MOCK_SCHOLARSHIPS };
};
