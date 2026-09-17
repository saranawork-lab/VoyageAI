import type { ApiResponse } from '@/types/api.types';
import type { InternshipListing, InternshipApplication } from '@/types/market.types';

const MOCK_LISTINGS: InternshipListing[] = [
  {
    id: 'int_001',
    company: 'Google',
    title: 'Software Engineering Intern',
    requirements: ['React', 'TypeScript', 'Data Structures'],
    duration: '6 Months',
    stipend: '₹1,00,000/mo',
    type: 'Hybrid',
    location: 'Bangalore',
    description: 'Work on cutting edge AI features for Google Workspace...',
    postedAt: '2 days ago',
    matchScore: 92,
  },
  {
    id: 'int_002',
    company: 'Microsoft',
    title: 'Frontend Developer Intern',
    requirements: ['React', 'CSS', 'Redux'],
    duration: '3 Months',
    stipend: '₹80,000/mo',
    type: 'Remote',
    location: 'Remote',
    description: 'Join the Office 365 web team...',
    postedAt: '5 days ago',
    matchScore: 88,
  },
];

const MOCK_APPLICATIONS: InternshipApplication[] = [
  {
    id: 'app_001',
    listingId: 'int_002',
    company: 'Microsoft',
    status: 'reviewing',
    appliedAt: '2023-11-10',
  },
];

export const getInternshipListings = async (): Promise<ApiResponse<InternshipListing[]>> => {
  return { success: true, data: MOCK_LISTINGS };
};

export const getApplications = async (userId: string): Promise<ApiResponse<InternshipApplication[]>> => {
  void userId;
  return { success: true, data: MOCK_APPLICATIONS };
};

export const applyToInternship = async (
  listingId: string,
  coverNote?: string
): Promise<ApiResponse<{ applicationId: string }>> => {
  void listingId; void coverNote;
  return { success: true, data: { applicationId: `app_new_${Date.now()}` } };
};
