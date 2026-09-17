import type { ApiResponse, PaginatedResponse } from '@/types/api.types';
import type { DealCard, InvestorProfile, IntroRequest, SectorReport } from '@/types/investor.types';

const MOCK_DEALS: DealCard[] = [
  {
    id: 'deal_001',
    startupId: 'stp_001',
    name: 'TechFlow AI',
    sector: 'Artificial Intelligence',
    stage: 'Seed',
    pitch: 'Automating developer workflows with generative AI.',
    matchScore: 94,
    founderName: 'Aditi Rao',
    teamSize: 5,
    askAmount: '₹5 Cr',
    description: 'TechFlow AI is building the next generation of developer tools. Our flagship product reduces code review time by 40%.',
    tractionMetrics: [
      { label: 'ARR', value: '₹20L' },
      { label: 'Users', value: '1,200' },
    ],
  },
  {
    id: 'deal_002',
    startupId: 'stp_002',
    name: 'GreenEnergy Solutions',
    sector: 'CleanTech',
    stage: 'Series A',
    pitch: 'Smart grid optimization software for utility companies.',
    matchScore: 88,
    founderName: 'Vikram Singh',
    teamSize: 15,
    askAmount: '₹20 Cr',
    description: 'B2B SaaS platform helping utility companies reduce transmission losses by 15% using predictive analytics.',
    tractionMetrics: [
      { label: 'ARR', value: '₹1.5Cr' },
      { label: 'Clients', value: '4 Enterprise' },
    ],
  },
  {
    id: 'deal_003',
    startupId: 'stp_003',
    name: 'HealthSync',
    sector: 'HealthTech',
    stage: 'Pre-Seed',
    pitch: 'Unified patient records for tier-2 hospitals.',
    matchScore: 75,
    founderName: 'Dr. Neha Patel',
    teamSize: 3,
    askAmount: '₹1.5 Cr',
    description: 'Mobile-first EHR system designed specifically for small clinics and nursing homes in tier-2/3 cities.',
    tractionMetrics: [
      { label: 'MRR', value: '₹50K' },
      { label: 'Hospitals', value: '12' },
    ],
  },
];

export const getInvestorMatches = async (
  investorId: string,
  page = 1,
  limit = 10
): Promise<PaginatedResponse<DealCard>> => {
  void investorId; void page; void limit;
  return {
    success: true,
    data: MOCK_DEALS,
    pagination: { total: 12, page: 1, limit: 10, totalPages: 2 },
  };
};

export const requestIntroduction = async (
  investorId: string,
  startupId: string
): Promise<ApiResponse<IntroRequest>> => {
  return {
    success: true,
    data: {
      id: `req_${Date.now()}`,
      investorId,
      startupId,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  };
};

export const getSectorReport = async (sector: string): Promise<ApiResponse<SectorReport>> => {
  return {
    success: true,
    data: {
      sector,
      summary: `The ${sector} market is experiencing rapid growth...`,
      growthRate: '24% YoY',
      topPlayers: ['Player 1', 'Player 2', 'Player 3'],
      investmentTrend: 'Increasing seed-stage activity.',
      riskLevel: 'medium',
      generatedAt: new Date().toISOString(),
    },
  };
};
