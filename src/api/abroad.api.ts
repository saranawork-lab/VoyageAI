import type { ApiResponse } from '@/types/api.types';
import type { AbroadCountry, AbroadPathway } from '@/types/market.types';

const MOCK_COUNTRIES: AbroadCountry[] = [
  { id: 'US', name: 'United States', flagEmoji: '🇺🇸' },
  { id: 'UK', name: 'United Kingdom', flagEmoji: '🇬🇧' },
  { id: 'CA', name: 'Canada', flagEmoji: '🇨🇦' },
  { id: 'AU', name: 'Australia', flagEmoji: '🇦🇺' },
  { id: 'DE', name: 'Germany', flagEmoji: '🇩🇪' },
  { id: 'SG', name: 'Singapore', flagEmoji: '🇸🇬' },
  { id: 'NL', name: 'Netherlands', flagEmoji: '🇳🇱' },
];

const MOCK_FIELDS = [
  { id: 'f_001', name: 'Computer Science' }, { id: 'f_002', name: 'Data Science' },
  { id: 'f_003', name: 'Mechanical Engineering' }, { id: 'f_004', name: 'Business Administration' },
];

const MOCK_PATHWAY: AbroadPathway = {
  countryName: 'United States',
  estimatedCost: '$60,000 / year',
  visaType: 'F-1 Student Visa',
  checklist: [
    { id: 'cl_001', task: 'Take GRE/TOEFL', completed: true, dueDate: 'Oct 2026' },
    { id: 'cl_002', task: 'Shortlist 8-10 universities', completed: true, dueDate: 'Nov 2026' },
    { id: 'cl_003', task: 'Submit applications', completed: false, dueDate: 'Jan 2027' },
    { id: 'cl_004', task: 'Apply for F-1 Visa', completed: false, dueDate: 'May 2027' },
  ],
  universities: [
    { name: 'Stanford University', location: 'Stanford, CA', matchScore: 92 },
    { name: 'MIT', location: 'Cambridge, MA', matchScore: 88 },
    { name: 'UC Berkeley', location: 'Berkeley, CA', matchScore: 85 },
  ],
};

export const getCountries = async (): Promise<ApiResponse<AbroadCountry[]>> => {
  return { success: true, data: MOCK_COUNTRIES };
};

export const getFields = async (query?: string): Promise<ApiResponse<any[]>> => {
  if (query) {
    const filtered = MOCK_FIELDS.filter((f) =>
      f.name.toLowerCase().includes(query.toLowerCase())
    );
    return { success: true, data: filtered };
  }
  return { success: true, data: MOCK_FIELDS };
};

export const generatePathway = async (
  country: string,
  field: string,
  budget: string,
  timeline: string
): Promise<ApiResponse<AbroadPathway>> => {
  void budget; void timeline;
  return { success: true, data: { ...MOCK_PATHWAY, countryName: country } };
};

export const updateChecklist = async (
  userId: string,
  itemId: string,
  checked: boolean
): Promise<ApiResponse<{ updated: boolean }>> => {
  void userId; void itemId; void checked;
  return { success: true, data: { updated: true } };
};
